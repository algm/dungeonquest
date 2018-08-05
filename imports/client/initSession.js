import { Session } from "meteor/session";
import uniqid from "uniqid";
import Cookie from "js-cookie";

export default function() {
    if (!Session.get("userId")) {
        let userId = Cookie.get("userId");
        if (!userId) {
            userId = uniqid();
            Cookie.set("userId", userId);
        }

        Session.set("userId", userId);
    }
}
