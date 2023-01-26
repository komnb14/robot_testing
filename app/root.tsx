import type {LinksFunction, LoaderArgs, MetaFunction} from "@remix-run/cloudflare";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from "@remix-run/react";
import i18next from "~/i18n.server";
import {json} from "@remix-run/router";
import {useTranslation} from "react-i18next";


// @ts-ignore
export const links: LinksFunction = () => {
    return [
        { rel: "alternate", hrefLang:'en', href: `https://robot-testing.pages.dev/?hl=en`},
        { rel: "alternate", hrefLang:'ko', href: `https://robot-testing.pages.dev/?hl=ko`},
        { rel: "alternate", hrefLang:'x-default', href: `https://robot-testing.pages.dev`},
    ];
};

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
    const url = request.url;
    return json({ title,url});
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
    let {url} = useLoaderData<typeof loader>();



    return (
        <html lang={i18n.language}>
        <head>
            <meta httpEquiv="content-language" content={i18n.language}/>
            <Meta/>
            <link rel={'canonical'} href={`${url}`}/>
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
