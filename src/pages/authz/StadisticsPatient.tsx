import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@components/ui/ContentArticle'
import HeaderArticle from '@components/ui/HeaderArticle'
import PatientsResidenceChart from '@components/patient/PatientsResidenceChart'
import PatientsTypeOfAssistanceChart from '@components/patient/PatientsTypeOfAssistanceByDayChart'
import PatientsTypeOfAssistanceByDayChart from '@components/patient/PatientsTypeOfByDayChart'
import PatientsGenderChart from '@components/patient/PatientsGenderChart'
import content from '@/config/data/pages/stadisticsPatient'

const StadisticsPatient = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <PatientsResidenceChart />
                    </div>
                    <div className="col-span-3">
                        <PatientsTypeOfAssistanceChart />
                    </div>
                    <div className="col-span-6">
                        <PatientsTypeOfAssistanceByDayChart />
                    </div>
                    <div className="col-span-6">
                        <PatientsGenderChart />
                    </div>
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default StadisticsPatient
