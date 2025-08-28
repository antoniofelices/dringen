import { useForm } from 'react-hook-form'
import { Button } from '@components/ui/base/button'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@components/ui/base/tabs'
import FormFieldInput from '@/components/ui/FormFieldInput'
import FormFieldTextarea from '@components/ui/FormFieldTextarea'
import AddDiagnosis from '@components/clinical-history/AddDiagnosis'

const AddClinicalHistory = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async () => {
        // Send data to Supabase
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs aria-label="Previous revision" defaultValue="examination">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="examination">
                            Examination
                        </TabsTrigger>
                        <TabsTrigger value="examination-data">
                            Examination Data
                        </TabsTrigger>
                        <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                        <TabsTrigger value="aditional-tests">
                            Aditional Tests
                        </TabsTrigger>
                        <TabsTrigger value="treatment">Treatment</TabsTrigger>
                    </TabsList>
                    <Button type="submit" size="sm" className="mr-2">
                        {isSubmitting ? 'Save' : 'Saving'}
                    </Button>
                </div>
                <div className="mt-4">
                    <TabsContent value="examination">
                        <FormFieldTextarea
                            errors={errors}
                            fieldName="examination"
                            label="Explain"
                            register={register}
                        />
                        <FormFieldInput
                            errors={errors}
                            fieldName="mood"
                            label="Mood"
                            register={register}
                            type="text"
                        />
                        <FormFieldInput
                            errors={errors}
                            fieldName="test"
                            label="Test"
                            register={register}
                            type="text"
                        />
                    </TabsContent>
                    <TabsContent value="examination-data">
                        <div>
                            <h4 className="text-xs mb-2 text-gray-500">FB</h4>
                            <div className="flex gap-4 justify-between">
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="eating"
                                    label="Eating"
                                    register={register}
                                    type="text"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="thirst"
                                    label="Thirst"
                                    register={register}
                                    type="text"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="urine"
                                    label="Urine"
                                    register={register}
                                    type="text"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="feces"
                                    label="Feces"
                                    register={register}
                                    type="text"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="sleep"
                                    label="Sleep"
                                    register={register}
                                    type="text"
                                />
                            </div>
                            <h4 className="text-xs mb-2 text-gray-500">FC</h4>
                            <div className="flex gap-4 justify-between">
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="heat"
                                    label="Heat"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="pas"
                                    label="PAS"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="pad"
                                    label="PAD"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="fc"
                                    label="FC"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="fr"
                                    label="FR"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="oximetry"
                                    label="Oximetry"
                                    register={register}
                                    type="number"
                                />
                            </div>
                            <h4 className="text-xs mb-2 text-gray-500">
                                Nutrition indicators
                            </h4>
                            <div className="flex gap-4 justify-between">
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="person_weight"
                                    label="Weight"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="person_height"
                                    label="Height"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="imc"
                                    label="IMC"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="waist"
                                    label="Waist"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="bfp"
                                    label="BFP"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="mmp"
                                    label="MMP"
                                    register={register}
                                    type="number"
                                />
                                <FormFieldInput
                                    errors={errors}
                                    fieldName="gfp"
                                    label="GFP"
                                    register={register}
                                    type="number"
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="diagnosis">
                        <AddDiagnosis errors={errors} register={register} />
                    </TabsContent>
                    <TabsContent value="aditional-tests">
                        <FormFieldTextarea
                            errors={errors}
                            fieldName="additional_tests"
                            label="Additional Tests"
                            register={register}
                        />
                    </TabsContent>
                    <TabsContent value="treatment">
                        <FormFieldTextarea
                            errors={errors}
                            fieldName="treatment"
                            label="Treatment"
                            register={register}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </form>
    )
}

export default AddClinicalHistory
