import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@components/ui/ContentArticle'
import HeaderArticle from '@components/ui/HeaderArticle'
import PatientsResidenceChart from '@components/patient/PatientsResidenceChart'
import PatientsAssistanceTypeChart from '@/components/patient/PatientsAssistanceTypeChart'
import PatientsAssistanceTypeDateChart from '@/components/patient/PatientsAssistanceTypeDateChart'
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
                        <PatientsAssistanceTypeChart />
                    </div>
                    <div className="col-span-6">
                        <PatientsAssistanceTypeDateChart />
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
