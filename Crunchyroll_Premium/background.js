browser.webRequest.onHeadersReceived.addListener(
    function(acso) {
      var responseHeaders = acso.responseHeaders.concat([{name: 'Access-Control-Allow-Origin', value: '*'}]);
      return { responseHeaders };
    },
    {
      urls: ["*://rgern100.github.io/*", "*://*.crunchyroll.com/*", "*://localhost/*", "*://*.vrv.co/*"],
      types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking","responseHeaders"]
  );
browser.webRequest.onHeadersReceived.addListener(
    function(csp) {
      var responseHeaders = csp.responseHeaders.concat([{name: 'content-security-policy', value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *.betrad.com 8f2bfa24-f12a-458a-89ac-391b91f711e3.redfastlabs.com accounts.crunchyroll.com api-manga.crunchyroll.com api.amplitude.com api.crunchyroll.com api.segment.io bam.nr-data.net beta-api.crunchyroll.com beta.crunchyroll.com boards-api.greenhouse.io cdimg1.crunchyroll.com cdimg2.crunchyroll.com cdimg3.crunchyroll.com cdn.amplitude.com cdn.cookielaw.org cdn.segment.com cdn.segment.io cdn.shopify.com cdnjs.cloudflare.com cms.crunchyroll.com conduit.redfast.com cr-eec.etp-prod.com crunchyroll.com crunchyroll.surveymonkey.com crunchyroll.zendesk.com customer.iad-03.braze.com eec.crunchyroll.com ekr.zdassets.com fy.v.vrv.co geolocation.onetrust.com img1.ak.crunchyroll.com img1.cdn.crunchyroll.com img1.crunchyroll.com img1.lln.crunchyroll.com img2.ak.crunchyroll.com img2.cdn.crunchyroll.com img2.lln.crunchyroll.com img3.ak.crunchyroll.com img3.cdn.crunchyroll.com img3.lln.crunchyroll.com js-agent.newrelic.com ll.v.vrv.co pl.crunchyroll.com privacyportal-eu.onetrust.com sa.crunchyroll.com sa.etp-prod.com sa.etp-proto0.com secure.crunchyroll.com static.ak.crunchyroll.com static.crunchyroll.com static.cx-proto0.com static.vrv.co static.zdassets.com store.crunchyroll.com v.vrv.co widget.surveymonkey.com wiki.crunchyroll.com www.crunchyroll.com www.google.com www.gstatic.com www.riddle.com www.surveymonkey.com www.zendesk.com *.deviantart.com *.fanpop.com *.fastpic.ru *.fls.doubleclick.net *.gfycat.com *.giphy.com *.imageshack.us *.imgbox.com *.imgflip.com *.imgur.com *.narvii.com *.photobucket.com *.photomania.com *.pinimg.com *.servimg.com *.static.flickr.com *.tenor.com *.tinypic.com *.tumblr.com *.twimg.com *.wikia.nocookie.net 1f2e7.v.fwmrm.net 5fd74.v.fwmrm.net 965432598.privacysandbox.googleadservices.com 982007020.privacysandbox.googleadservices.com ad.doubleclick.net ads.stickyadstv.com ads.yahoo.com ag.gbc.criteo.com ams01-event.spotxchange.com ams01-search.spotxchange.com analytics.tiktok.com analytics.twitter.com api.realytics.io apiservices.krxd.net bea4.v.fwmrm.net beacon.krxd.net bid.g.doubleclick.net cdn-eu.realytics.net cdn.krxd.net cdn.polyfill.io cl.qualaroo.com cm.g.doubleclick.net connect.facebook.net consumer.krxd.net crfeaturesbiz.wpcomstaging.com criteo-partners.tremorhub.com csm.da.us.criteo.net csm.va.us.criteo.net dntcl.qualaroo.com eq97f.publishers.tremorhub.com event.spotxchange.com fonts.googleapis.com fonts.gstatic.com gem.gbc.criteo.com googleads.g.doubleclick.net googleads4.g.doubleclick.net graph.instagram.com gum.criteo.com i.cdn.turner.com i.realytics.io iad02-event.spotxchange.com iad02-search.spotxchange.com insight.adsrvr.org instagram.com js.adsrvr.org jslog.krxd.net mssl.fwmrm.net pixel.advertising.com platform.twitter.com player.vimeo.com quiz.tryinteract.com r.casalemedia.com sb.scorecardresearch.com search.spotxchange.com sp.analytics.yahoo.com ssl.google-analytics.com sslwidget.criteo.com static.ads-twitter.com static.criteo.net static.doubleclick.net stats.g.doubleclick.net sync.search.spotxchange.com syndication.twitter.com t.co tp.realytics.io ups.analytics.yahoo.com usermatch.krxd.net vimeo.com widget.us.criteo.com www.facebook.com www.google-analytics.com www.googleadservices.com www.googletagmanager.com www.instagram.com www.youtube.com wvc-x-callback:"}]);  
      return { responseHeaders };
    },
    {
      urls: ["*://*.crunchyroll.com/*"],
      types : ["main_frame", "sub_frame"]
    },
    ["blocking","responseHeaders"]
	)