import {render, screen, fireEvent} from '@testing-library/react'
import Login from "../Components/Pages/Login/Login";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {BrowserRouter} from "react-router-dom";
import { Layout } from "../Components/Layout";

const mockStore = configureStore([]);

describe("Login Process Start...", () => {

    it("Login successful", () => {

        const store = mockStore({
            auth: {
                successMessage: "The user has successfully logged in.",
                errorMessage: "Error Logging in user."
            }
        });

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByTestId("welcome")).toBeInTheDocument();

        const emailInput = screen.getByLabelText(/email/i);
        fireEvent.change(emailInput, { target: { value: 'ronakkoladiya.bvminfotech@gmail.com' } });
        expect(emailInput).toHaveValue("ronakkoladiya.bvminfotech@gmail.com");

        const passInput = screen.getByLabelText(/password/i);
        fireEvent.change(passInput, {target: {value: 'Bvm@1211'}});
        expect(passInput).toHaveValue("Bvm@1211");

        const signInButton = screen.getByTestId("signInButton");
        fireEvent.click(signInButton);
    })

    it("Reached Dashboard...", () => {

        const store = mockStore({
            auth: {
                userDetails: {
                    userType: 'admin'
                }
            }
        });

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Layout/>
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    })

})