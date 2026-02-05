import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { ScrollArea } from '@shared/components/ui/base/scroll-area'
import content from './TermsOfUse.content'

const TermsOfUse = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2>{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[600px] w-[50vw] rounded-md border dark:border-gray-600 p-4">
                        <h2 className="my-4">Who we are</h2>
                        <p>
                            Our website address is: https://dringen.io
                            <br /> We are Dringen Company Registration No: 000.
                            Registered Office: 42 Crecy Court, 8 Hotspur Street,
                            London, United Kingdom SE11 6BS.
                        </p>

                        <h2 className="my-4">
                            What personal data we collect and why we collect it
                        </h2>
                        <p>
                            For users that register on our form, we store the
                            personal information they provide. All users can
                            see, edit, or delete their personal information at
                            any time. Website administrators can also see and
                            edit that information.
                        </p>

                        <p>
                            Single "insight" on this site may include embedded
                            content (e.g. videos, images, articles, etc.).
                            Embedded content from other websites behaves in the
                            exact same way as if the visitor has visited the
                            other website.
                        </p>

                        <p>
                            These websites may collect data about you, use
                            cookies, embed additional third-party tracking, and
                            monitor your interaction with that embedded content,
                            including tracking your interaction with the
                            embedded content if you have an account and are
                            logged in to that website.
                        </p>

                        <h2 className="my-4">How is personal data used?</h2>
                        <p>
                            The User’s personal data is used for the following
                            purposes:
                        </p>

                        <p>
                            In general, the User’s details shall be used to
                            manage the contracting of professional services
                            offered on the Website, as well as the corresponding
                            performance and invoicing, to reply to the User’s
                            requests, doubts or questions raised in relation to
                            same, to provide access to the sections requiring
                            identification, and to manage and improve the
                            services offered through the Website. This
                            processing has its legal basis on the performance of
                            the contract for the provision of services and/or
                            the consent of the interested party to the case in
                            question.
                        </p>

                        <p>
                            To provide the User, by email or other electronic or
                            non-electronic means, with information relating to
                            the contracted services, novelties and value-added
                            improvements and related activities and training.
                            This processing is based on the legitimate interest
                            of Dringen to carry out such processing in
                            accordance with the regulations in force.
                        </p>

                        <h2 className="my-4">Who we share your data with</h2>
                        <p>
                            We do not share your information with any third
                            parties.
                        </p>

                        <h2 className="my-4">How long we retain your data</h2>
                        <p>
                            The data processing carried out by Nemeda is
                            performed only during the period required to provide
                            the services, reply to the User’s request or, if the
                            User has requested to receive information until the
                            User cancels the relevant subscription. After this,
                            if applicable, Nemeda shall keep the information
                            blocked as long as required by the law.
                        </p>
                        <p>
                            The data provided in relation to personnel selection
                            processes in which you intend to take part shall be
                            kept for one year from the date of their latest
                            update. Upon expiry of this period without any new
                            update, the data shall be deleted, unless otherwise
                            requested by the data subject.
                        </p>

                        <h2 className="my-4">
                            What rights you have over your data
                        </h2>
                        <p>
                            You can request to receive an exported file of the
                            personal data we hold about you, including any data
                            you have provided to us. You can also request that
                            we erase any personal data we hold about you. This
                            does not include any data we are obliged to keep for
                            administrative, legal, or security purposes.
                        </p>
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    )
}

export default TermsOfUse
