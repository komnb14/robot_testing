import type {LoaderArgs, MetaFunction} from "@remix-run/cloudflare";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from "@remix-run/react";
import i18next from "~/i18n.server";
import {json} from "@remix-run/router";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

export const handle = {
    i18n: "common",
}

export const getUrlHLParams = (url: string) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("hl");

}

export async function loader({request}: LoaderArgs) {
    const t = await i18next.getFixedT(request, 'common')
    const title = t('header');
    return json({ title});
}

export const meta: MetaFunction = ({data}) => {
    return {
        charset: "utf-8",
        viewport: "width=device-width,initial-scale=1",
        title: data.title,
    }
};

export default function App() {
    const {i18n} = useTranslation();
    let {title} = useLoaderData<typeof loader>();




    return (
        <html lang={i18n.language}>
        <head>
            <meta httpEquiv="content-language" content={i18n.language}/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
