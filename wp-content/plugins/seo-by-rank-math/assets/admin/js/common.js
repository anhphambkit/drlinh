!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=204)}({204:function(e,t,a){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r;r=jQuery,String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,a){return void 0!==e[a]?e[a]:t})}),String.prototype.trimRight=function(e){return void 0===e&&(e="s"),this.replace(RegExp("["+e+"]+$"),"")},r(function(){window.rankMathAdmin={init:function(){this.misc(),this.tabs(),this.searchConsole(),this.dependencyManager()},misc:function(){void 0!==jQuery.fn.select2&&r("[data-s2]").select2(),r(".cmb-group-text-only,.cmb-group-fix-me").each(function(){var e=r(this),t=e.find(".cmb-repeatable-group"),a=t.find("> .cmb-row:eq(0) > .cmb-th");e.prepend('<div class="cmb-th"><label>'+a.find("h2").text()+"</label></div>"),t.find(".cmb-add-row").append('<span class="cmb2-metabox-description">'+a.find("p").text()+"</span>"),a.parent().remove()}),r(".rank-math-collapsible-trigger").on("click",function(e){e.preventDefault();var t=r(this),a=r("#"+t.data("target"));t.toggleClass("open"),a.toggleClass("open")})},searchConsole:function(){var e=this,t=null,a=r("#console_authorization_code"),i=r("#gsc-dp-info"),o=r("#console_profile"),c=a.parent(),s=o.parent(),l=s.find(".button-primary"),d=r("body").hasClass("rank-math-wizard-body--searchconsole")?r("> p:first-of-type",".cmb-form"):r("h1",".rank-math-wrap-settings");a.after(c.find(".button")),o.after(s.find(".button")),o.on("change",function(){null===o.val()||o.val().indexOf("sc-domain:")?i.addClass("hidden"):i.removeClass("hidden")}).change(),t=l.prev(),a.data("authorized")&&a.hide(),c.on("click",".button-secondary",function(e){e.preventDefault(),window.open(this.href,"","width=800, height=600")}),c.on("click",".button-primary",function(i){i.preventDefault();var o=r(this);o.prop("disabled",!0),a.data("authorized")?e.ajax("search_console_deauthentication").always(function(){o.prop("disabled",!1)}).done(function(){a.val(""),r("#submit-cmb").trigger("click"),"object"===("undefined"==typeof rankMathSetupWizard?"undefined":n(rankMathSetupWizard))&&(a.show(),a.data("authorized",!1),c.find(".button-secondary").show(),o.html("Authorize"),t.prop("disabled",!0),l.prop("disabled",!0))}):(a.addClass("input-loading"),e.ajax("search_console_authentication",{code:a.val()}).always(function(){o.prop("disabled",!1),a.removeClass("input-loading")}).done(function(n){n&&!n.success&&e.addNotice(n.error,"error",d),n&&"fail"===n.status&&e.addNotice(n.body.error_description,"error",d),n&&"success"===n.status&&(a.hide(),a.data("authorized",!0),c.find(".button-secondary").hide(),o.html("De-authorize Account"),l.trigger("click"),t.removeAttr("disabled"))}))}),l.on("click",function(a){a.preventDefault(),l.prop("disabled",!0),t.addClass("input-loading"),e.ajax("search_console_get_profiles").always(function(){l.prop("disabled",!1),r(".console-cache-update-manually").prop("disabled",!1),t.removeClass("input-loading")}).done(function(a){if(a&&!a.success&&e.addNotice(a.error,"error",d),a&&a.success){var n=a.selected||t.val();t.html(""),r.each(a.profiles,function(e,a){t.append('<option value="'+e+'">'+a+"</option>")}),t.val(n||Object.keys(a.profiles)[0]),l.removeClass("hidden")}})})},dependencyManager:function(){var e=this,t=r(".cmb-form, .rank-math-metabox-wrap");r(".cmb-repeat-group-wrap",t).each(function(){var e=r(this),t=e.next(".rank-math-cmb-dependency.hidden");t.length&&e.find("> .cmb-td").append(t)}),r(".rank-math-cmb-dependency",t).each(function(){e.loopDependencies(r(this))}),r("input, select",t).on("change",function(){var t=r(this).attr("name");r('span[data-field="'+t+'"]').each(function(){e.loopDependencies(r(this).closest(".rank-math-cmb-dependency"))})})},checkDependency:function(e,t,a){return"string"==typeof t&&t.includes(",")&&"="===a?t.includes(e):"string"==typeof t&&t.includes(",")&&"!="===a?!t.includes(e):"="===a&&e===t||"=="===a&&e===t||">="===a&&t<=e||"<="===a&&e<=t||">"===a&&t<e||"<"===a&&e<t||"!="===a&&e!==t},loopDependencies:function(e){var t,a=this,n=e.data("relation");e.find("span").each(function(){var e=r(this),i=e.data("value"),o=e.data("comparison"),c=r("[name='"+e.data("field")+"']"),s=c.val();c.is(":radio")&&(s=c.filter(":checked").val()),c.is(":checkbox")&&(s=c.is(":checked"));var l=a.checkDependency(s,i,o);if("or"===n&&l)return!(t=!0);"and"===n&&(t=void 0===t?l:t&&l)});var i=e.closest(".rank-math-cmb-group");i.length||(i=e.closest(".cmb-row")),t?i.slideDown(300):i.hide()},tabs:function(){var e=r(".rank-math-tabs-navigation");e.length&&e.each(function(){var t=r(this),a=t.closest(".rank-math-tabs"),n=r(">a",t),i=r(">.rank-math-tabs-content>.rank-math-tab",a),o=t.data("active-class")||"active";n.on("click",function(){var e=r(this),t=e.attr("href");return n.removeClass(o),i.hide(),e.addClass(o),r(t).show(),!1});var c=location.hash||localStorage.getItem(a.attr("id"));null===c?n.eq(0).trigger("click"):(c=r('a[href="'+c+'"]',t)).length?c.trigger("click"):n.eq(0).trigger("click"),e.next().css("min-height",t.outerHeight())})},variableInserter:function(e){var t=this,a=r("body"),n=r("input[type=text], textarea",".rank-math-supports-variables");if(e=void 0===e||e,n.length){n.attr("autocomplete","off"),n.wrap('<div class="rank-math-variables-wrap"/>'),r(".rank-math-variables-wrap").append('<a href="#" class="rank-math-variables-button button button-secondary"><span class="dashicons dashicons-arrow-down-alt2"></span></a>'),e&&(r(".rank-math-variables-wrap").after('<div class="rank-math-variables-preview" data-title="Example"/>'),n.on("rank_math_variable_change input",function(e){var a=r(e.currentTarget),n=t.replaceVariables(a.val());60<n.length&&~a.attr("name").indexOf("title")&&(n=n.substring(0,60)+"..."),a.parent().next(".rank-math-variables-preview").html(n)}),n.trigger("rank_math_variable_change"));var i=r("<ul/>"),o=r('<div class="rank-math-variables-dropdown"><input type="text" placeholder="Search &hellip;"></div>');r.each(rankMath.variables,function(e){i.append('<li data-var="%'+e+'%"'+(this.example?' data-example="'+this.example+'"':"")+"><strong>"+this.name+"</strong><span>"+this.desc+"</span></li>")}),o.append(i),r(".rank-math-variables-wrap:eq(0)").append(o);var c=r(".rank-math-variables-button, .rank-math-variables-button *, .rank-math-variables-dropdown, .rank-math-variables-dropdown *");r(a).on("click",function(e){r(e.target).is(c)||o.hide()});var s=o.find("input"),l=o.find("li");r(a).on("click",".rank-math-variables-button",function(e){e.preventDefault(),r(this).after(o),l.show(),o.show(),s.val("").focus()}),o.on("click","li",function(e){e.preventDefault();var t=r(this),a=t.closest(".rank-math-variables-wrap").find(">:first-child");a.val(r.trim(a.val())+" "+t.data("var")),a.trigger("rank_math_variable_change").trigger("input"),o.hide()}),o.on("keyup","input",function(e){e.preventDefault();var t=r(this).val().toLowerCase();t.length<2?l.show():l.hide().each(function(){var e=r(this);~e.text().toLowerCase().indexOf(t)&&e.show()})})}},replaceVariables:function(e){return r.each(rankMath.variables,function(t){if(!this.example)return!0;t=t.replace(/\([a-z]+\)/g,"\\(.*?\\)"),e=e.replace(RegExp("%+"+t+"%+","g"),this.example)}),e},ajax:function(e,t,a){return r.ajax({url:rankMath.ajaxurl,type:a||"POST",dataType:"json",data:r.extend(!0,{action:"rank_math_"+e,security:rankMath.security},t)})},addNotice:function(e,t,a,n){n=n||!1;var i=r('<div class="notice notice-'+(t=t||"error")+' is-dismissible"><p>'+e+"</p></div>").hide();a.next(".notice").remove(),a.after(i),i.slideDown(),r(document).trigger("wp-updates-notice-added"),n&&setTimeout(function(){i.fadeOut()},n)}},window.rankMathAdmin.init()})}});