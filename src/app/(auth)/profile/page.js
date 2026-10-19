"use client";

import {  updateUser } from "@/lib/auth-client"


import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

const ProfilePage = () => {
    const handleUserUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const resData = await updateUser({
            name: userData.name
        })

        alert("User updated successfully " , resData);

    

        
    };

    

        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <Form className="w-full max-w-96" onSubmit={handleUserUpdate}>
                    <Fieldset>
                        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
                        <Description>Update your name.</Description>

                        <FieldGroup>
                            <TextField
                                isRequired
                                name="name"
                                validate={(value) => {
                                    if (value.trim().length < 3) {
                                        return "Name must be at least 3 characters";
                                    }

                                    return null;
                                }}
                            >
                                <Label>Name</Label>
                                <Input placeholder="Enter your name" />
                                <FieldError />
                            </TextField>
                        </FieldGroup>

                        <Fieldset.Actions>
                            <Button 
                                type="submit">

                                Save changes
                            </Button>

                            <Button type="reset" variant="secondary">
                                Cancel
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </div>
        );
    };

    export default ProfilePage;