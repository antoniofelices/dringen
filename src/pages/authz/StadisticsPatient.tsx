import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import PatientsResidenceChart from '@/components/patient/PatientsResidenceChart'
import content from '@/config/data/pages/stadisticsPatient'

// import { useDataTotalPatients } from '@/hooks/usePatientsStadistics'

const StadisticsPatient = () => {
    // const residenceData = useDataTotalPatients()
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <PatientsResidenceChart />
                    </div>
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default StadisticsPatient
