export const allJobResponse = ["not Yet" , "ghosted" , "automated follow" , "automated reject" , "follow" , "reject"] as const;
export type JobResponse = typeof allJobResponse[number];

export const allJobStatus = ["need to apply" , "have apply" , "rejected" , "follow" , "interview" , "offer" , "accepted"] as const;
export type JobStatus = typeof allJobStatus[number];

export type JobInterview = {
    scheduledAt?: number,
    with?: string,
    email?: string,
    phone?: string,
    response: JobResponse
}

export interface Application {
    uuid: string,
    business: string,
    jobTitle: string,
    info?: string,
    email?: string,
    phone?: string,
    pay?: number,
    hourPerWeek?: number,
    link?: string,
    applyDate?: number,
    interviews: JobInterview[],
    response: JobResponse,
    status: JobStatus,
    detailsOpen: boolean
}