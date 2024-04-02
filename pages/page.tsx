import {useApp, Wrapper} from "@graphcms/app-sdk-react";
import {Button, Flex, Heading, Inline, Input, Spinner, Stack, Text} from "@hygraph/baukasten";
import {GlobalConfiguration, typeGuard} from "../@types/app";
import {Form, Formik, Field} from "formik";
import React from "react";


function PageElement() {
    return (
        <Stack px={60} py={60} maxWidth={800} >

            <Stack gap={16}>
                <Heading>Global Settings</Heading>
                <Text>Options for Global theme configuration</Text>
                <Configure />
            </Stack>
        </Stack>
    );
}
function Configure() {
    const { updateInstallation, installation } = useApp();
    const {config: init} = installation
    const initialValues: GlobalConfiguration = { ga4: typeGuard(init.ga4, 'string')  ? init.ga4 : '' };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const {status} = await updateInstallation({ status: "COMPLETED", config: values })
                console.log('status', status)
                if (status === "COMPLETED") return actions.setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Stack gap={16} >
                        <Stack gap="4">
                            <label htmlFor="ga4">Google Tag ID</label>
                            <Field type={'text'} as={Input} id="ga4" name="ga4" placeholder="Google Tag ID" />
                        </Stack>
                        <Stack gap="4">
                            <label htmlFor="theme">Google Tag ID</label>
                            <Field type={'text'} as={Input} id="ga4" name="ga4" placeholder="Google Tag ID" />
                        </Stack>
                        <Flex>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <Inline>
                                        <Spinner color="white" />
                                    </Inline>
                                ) : 'Update'}
                            </Button>
                        </Flex>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}
export default function Page() {
    return (
        <Wrapper>
            <PageElement />
        </Wrapper>
    );
}
