import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@components/ui/ContentArticle'
import HeaderArticle from '@components/ui/HeaderArticle'
import PatientsResidenceChart from '@components/patient/PatientsResidenceChart'
import PatientsTypeOfChart from '@components/patient/PatientsTypeOfChart'
import PatientsTypeOfByDayChart from '@components/patient/PatientsTypeOfByDayChart'
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
                        <PatientsTypeOfChart />
                    </div>
                    <div className="col-span-6">
                        <PatientsTypeOfByDayChart />
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
