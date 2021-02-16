import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { JobAnnouncement } from "src/entities/job/jobAnnouncement.entity";
import { User } from "src/entities/users/user.entity";
import { Action } from "src/policies/action.enum";

type Subjects = InferSubjects<typeof JobAnnouncement | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
      can(Action.Delete, 'all');
      can(Action.Update, 'all');
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    can(Action.Update, User, { id: user.id });
    can(Action.Delete, User, { id: user.id });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
