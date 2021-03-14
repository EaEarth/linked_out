export interface ApplicationForm {
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
    tags: string[];
}

export default ApplicationForm;