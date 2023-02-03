import {useTranslation} from "react-i18next";
import {useCallback} from "react";
import type {LoaderArgs} from "@remix-run/cloudflare";
import {json} from "@remix-run/router";
import {useLoaderData} from "@remix-run/react";

export async function loader({context}: LoaderArgs) {
    console.log("ZXCZXCZXCZXC");
    // @ts-ignore
    const kv = await context.ITEM_KV.get("Item_en_US");

    console.log("asdasdasdasd")
    console.log(kv);
    console.log("asdasdasdasd")
    return json({ok: 200, kv});
}


export default function Index() {
    let {kv} = useLoaderData<typeof loader>();
    const {t, i18n} = useTranslation();


    const onClickButton = useCallback(() => {
        if (i18n.language === 'ko') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('ko');
        }
    }, [i18n.language]);

    return (
        <div>
            {kv}
            <div>{t("greeting")}</div>
            <div>asdasdadadzxczxczxczxczxcz</div>
            <button onClick={onClickButton}>{t("button")}</button>
        </div>
    );
}
