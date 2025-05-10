import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { Mentions } from "../features/mentions/MentionsLegales";

export const MentionsLegales = () => {
    return (
        <>
            <Navbar isProductList={true} />
            <Mentions />
            <Footer />
        </>
    );
};
