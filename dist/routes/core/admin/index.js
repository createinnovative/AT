"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("./auth");
//import profile from "./profile";
//import registration from "./registration";
/******************************************************************************/
exports.default = function (eventListener, components, procedures, helpers) {
    /**********************************************************/
    var router = express.Router();
    /**********************************************************/
    router.use("/auth", auth_1.default(procedures.core.common.auth.signIn, helpers.setViewContexts, components.response.send));
    // router.use( "/profile", authCheck, profile() ) -- use authCheck, not for registration
    /**********************************************************/
    router.get("/", authCheck, function (req, res, next) {
        return components.response.send(res, "core-admin", true, null, {
            currentUser: res.locals.currentUser
        });
    });
    /**********************************************************/
    function authCheck(req, res, next) {
        if (!components.session.signedIn(req)) {
            return signInFirst();
        }
        return components.session.getCurrentUser(req)
            .then(function (currentUser) {
            if (currentUser.accessLevel == "admin") {
                res.locals.currentUser = currentUser;
                return next();
            }
            else {
                return signInFirst();
            }
        });
        function signInFirst() {
            return components.response.send(res, "passpoint-admin", false, "You need to sign in first", null);
        }
    }
    /**********************************************************/
    return router;
};
/******************************************************************************/ 