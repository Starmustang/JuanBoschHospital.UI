export interface DateDoctor 
{
    dateDoctorId: number,
    dateDoctorSintoms: string,
    dateDoctorIndicatedAnalisis: string,
    dateDoctorTreatment: string,
    dateDoctorNotes: string,
    dateDoctorNextDate: Date,
    medicEvaluationId: number
}

export interface DateDoctorPost 
{
    dateDoctorSintoms: string,
    dateDoctorIndicatedAnalisis: string,
    dateDoctorTreatment:string,
    dateDoctorNotes: string,
    dateDoctorNextDate: Date,
    medicEvaluationId: number
}

export interface DateDoctorPut
{
    dateDoctorId: number,
    dateDoctorSintoms: string,
    dateDoctorIndicatedAnalisis: string,
    dateDoctorTreatment: string,
    dateDoctorNotes: string,
    dateDoctorNextDate: Date,
    medicEvaluationId: number
  }