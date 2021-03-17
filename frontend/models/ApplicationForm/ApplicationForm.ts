export interface ApplicationForm {
    id: number;
    experience: string;
    education: number;
    feedback: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    applicant: {
        id: number;
        email: string;
        prefix: string;
        firstname: string;
        lastname: string;
        birthDate: string;
        address: string;
        telNumber: string;
        avatarFile?: Partial<{
            id: number;
            title: string;
            type: string;
            path: string;
        }>;
    };
    coverLetter?: Partial<{
        id: number;
        title: string;
        type: string;
        path: string;
    }>;
    jobAnnouncement: {
        id: number;
        title: string;
        company: string;
        lowerBoundSalary: number;
        upperBoundSalary: number;
        isPublished: boolean;
        description: string;
        address: string;
        province: string;
        amountRequired: number;
        createdAt: string;
        updatedAt: string;
        picture?: Partial<{
            id: number;
            title: string;
            type: string;
            path: string;
        }>;
    };
    transcript?: Partial<{
        id: number;
        title: string;
        type: string;
        path: string;
    }>;
    resume?: Partial<{
        id: number;
        title: string;
        type: string;
        path: string;
    }>;
}

export default ApplicationForm;