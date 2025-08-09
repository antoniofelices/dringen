import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const NewHpi = () => {
    return (
        <div>
            <Tabs aria-label="Previous revision" defaultValue="examination">
                <TabsList>
                    <TabsTrigger value="examination">Examination</TabsTrigger>
                </TabsList>
                <TabsContent value="examination"></TabsContent>
            </Tabs>
            <div>
                <h4 className="text-xs mb-2 text-gray-500">FB</h4>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Eating</th>
                            <th className="px-6 py-3">Thirst</th>
                            <th className="px-6 py-3">Urine</th>
                            <th className="px-6 py-3">Feces</th>
                            <th className="px-6 py-3">Sleep</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">
                                <FormItem>
                                    <FormLabel>Eating</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            </td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">Vital functions</h4>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">T</th>
                            <th className="px-6 py-3">PAS</th>
                            <th className="px-6 py-3">PAD</th>
                            <th className="px-6 py-3">FC</th>
                            <th className="px-6 py-3">FR</th>
                            <th className="px-6 py-3">Oximetry</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">
                    Nutrition indicators
                </h4>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Weight</th>
                            <th className="px-6 py-3">Height</th>
                            <th className="px-6 py-3">IMC</th>
                            <th className="px-6 py-3">Waist</th>
                            <th className="px-6 py-3">BFP</th>
                            <th className="px-6 py-3">MMP</th>
                            <th className="px-6 py-3">GFP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewHpi
