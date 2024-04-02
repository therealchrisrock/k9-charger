import {useApp, Wrapper } from "@graphcms/app-sdk-react";
import {Box, Button, Text, Heading, Stack, Input, Label, Divider, Flex, Inline, Spinner} from "@hygraph/baukasten";
import React, {useState} from "react";
import {typeGuard} from "../@types/app";
import {ErrorMessage, Field, Form, Formik} from "formik";

function SetupElement() {
    const { installation } = useApp();
    return (
        <Stack gap="24">
            <Box>
                <Summary />
            </Box>
            <Divider />
            <Stack gap="16">
                <Heading>Global Settings</Heading>
                <Configure isInstalled={installation.status !== 'COMPLETED'} />
            </Stack>
        </Stack>
    )
}


function Summary() {
    return (
        <Stack gap={"16"}>
            <Heading as={'h1'}>K9 Charger</Heading>
            <Text >
                This app contains a collection of highly opinionated utilities for Hygraph.
            </Text>
            <Divider />
            <Stack as={'ol'} gap="8">
                <li>1. The &quot;Position&quot; custom field.</li>
                <li>2. Global configuration page.</li>
            </Stack>
        </Stack>
    )
}

type Config = {
    ga4: string
}

function Configure({isInstalled}: {isInstalled: boolean}) {
    const { updateInstallation, installation } = useApp();
    const {config: init} = installation
    const initialValues: Config = { ga4: typeGuard(init.ga4, 'string')  ? init.ga4 : '' };


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
                                    ) : isInstalled ? 'Install' : 'Update'}
                                </Button>
                            </Flex>
                        </Stack>
                    </Form>
                )}
            </Formik>
    );
}

export default function Setup() {
    return (
        <Wrapper>
            <SetupElement />
        </Wrapper>
    );
}
