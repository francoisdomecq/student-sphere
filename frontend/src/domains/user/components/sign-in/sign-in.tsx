import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosClient from "../../../../config/axios";
import Button from "../../../core/components/button/button.tsx";
import HomePage from "../../../core/components/home-page/home-page.tsx";
import Select from "../../../core/components/select/select.tsx";
import TextInput from "../../../core/components/text-input/text-input.tsx";
import useDebounceValue from "../../../core/hooks/use-debounce-value.tsx";
import { Establishment } from "../../../establishments/types";
import { UserSignIn } from "../../types";

const defaultUserSignIn: UserSignIn = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    establishmentId: ""
};

const SignIn = () => {
    const navigate = useNavigate();
    const [userSignIn, setUserSignIn] = useState<UserSignIn>(defaultUserSignIn);
    const [establishments, setEstablishments] = useState<Establishment[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    const debouncedSearchValue = useDebounceValue(searchValue, 500);
    const handleChangeUserSignIn = (event: ChangeEvent<HTMLInputElement>) => {
        setUserSignIn((prevUser) => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const handleSelectEstablishment = (option: {value: string, label: string}) => {
        setUserSignIn((prevUser) => ({ ...prevUser, establishmentId: option.value }));
        setSearchValue(option.label);
    };

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSubmitUserSignIn = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosClient.post("/user/auth", userSignIn).then(() => navigate("/"));
    };

    useEffect(() => {
        const params = { search: debouncedSearchValue };
        axiosClient.get<Establishment[]>("/establishment", { params }).then((response) => {
            setEstablishments(response.data);
        });
    }, [debouncedSearchValue]);

    const establishmentsOptions = useMemo(() =>
        establishments.map(establishment => ({
            value: establishment.establishmentId,
            label: establishment.establishmentName
        }))
    , [establishments]);
    return (
        <HomePage>
            <form onSubmit={handleSubmitUserSignIn}>
                <TextInput label="Email" type="email" name="email" onChange={handleChangeUserSignIn}/>
                <TextInput label="Username" type="text" name="username" onChange={handleChangeUserSignIn}/>
                <TextInput label="Password" type="password" name="password" onChange={handleChangeUserSignIn}/>
                <TextInput label="First Name" type="text" name="firstName" onChange={handleChangeUserSignIn}/>
                <TextInput label="Last Name" type="text" name="lastName" onChange={handleChangeUserSignIn}/>
                <Select
                    label="Recherchez un établissement"
                    name="establishmentId"
                    options={establishmentsOptions}
                    onSelect={handleSelectEstablishment}
                    searchValue={searchValue}
                    selectedValue={searchValue}
                    onChange={handleChangeSearchValue}/>
                <Button type="submit">Sign In</Button>
            </form>
        </HomePage>
    );
};

export default SignIn;