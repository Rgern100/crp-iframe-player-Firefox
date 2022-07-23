const query = qry => document.body.querySelector(qry)
var preservedState = null

//function que pega algo dentro dentro do html.
function pegaString(str, first_character, last_character) {
  if (str.match(first_character + "(.*)" + last_character) == null) {
    return null;
  } else {
    new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
    return new_str;
  }
}

//function para remover elementos da página
function remove(element, name, untilRemoved = false, callback = () => { }) {
  let tries = 0;
  if (untilRemoved) {
    const finishRemove = setInterval(() => {
      if (query(element) != null) {
        clearInterval(finishRemove)
        console.log(`[CR Premium] Removendo ${name}...`);
        const closeBtn = query(element + ' > .close-button')
        if (closeBtn) closeBtn.click()
        else query(element).style.display = 'none';

        callback()
      }
      else if (tries > 250) clearInterval(finishRemove)
      else tries++
    }, 20)
  } else if (query(element) != null) {
    console.log(`[CR Premium] Removendo ${name}...`);
    query(element).style.display = 'none';
  }
}

//function que mudar o player para um mais simples.
function importPlayer() {
  var HTML = document.documentElement.innerHTML;
  console.log("[CR Old] Removendo player da Crunchyroll...");
  var elem = document.getElementById('showmedia_video_player');
  elem.parentNode.removeChild(elem);

  console.log("[CR Old] Pegando dados da stream...");
  var video_config_media = JSON.parse(pegaString(HTML, "vilos.config.media = ", ";"));

  //Remove Nota do topo sobre experimentar o premium
  //Remove avisos q o video nn pode ser visto
  //Remove sugestão de inscrever-se para o trial gratuito
  remove(".freetrial-note", "Free Trial Note")
  remove(".showmedia-trailer-notice", "Trailer Notice")
  remove("#showmedia_free_trial_signup", "Free Trial Signup")

  // Simular interação do usuário para deixar em fullscreen automaticamente
  // var element = document.getElementById("template_scroller");
  // if (element) element.click();

  const appendTo = query("#showmedia_video_box") || query("#showmedia_video_box_wide")
  const series = document.querySelector('meta[property="og:title"]');
  const up_next = document.querySelector('link[rel=next]');

  var message = {
    'video_config_media': [JSON.stringify(video_config_media)],
    'lang': [pegaString(HTML, 'LOCALE = "', '",')],
    'series': series ? series.content : undefined,
    'up_next': up_next ? up_next.href : undefined,
  }

  console.log("[CR Old] Adicionando o jwplayer...");
  addPlayer(appendTo, message)
}

//renderiza player na versão beta
function importBetaPlayer(ready = false) {
  var videoPlayer = query('.video-player') || query('#frame');
  if (!ready) {
    setTimeout(() => importBetaPlayer(!!videoPlayer), 100);
    return;
  }

  console.log("[CR Beta] Removendo player da Crunchyroll...");
  remove('.video-player-placeholder', 'Video Placeholder')
  const appendTo = videoPlayer.parentNode;
  appendTo.removeChild(videoPlayer);

  console.log("[CR Beta] Pegando dados da stream...");
  var external_lang = preservedState.localization.locale.toLowerCase()
  var ep_lang = preservedState.localization.locale.replace('-', '')
  var ep_id = preservedState.watch.id
  var ep = preservedState.content.byId[ep_id]
  if (!ep) { window.location.reload(); return; }
  var series_slug = ep.episode_metadata.series_slug_title
  var external_id = ep.external_id.substr(4)
  var old_url = `https://www.crunchyroll.com/${external_lang}/${series_slug}/episode-${external_id}`
  var up_next = document.querySelector('[data-t="next-episode"] > a')
  var playback = ep.playback

  var message = {
    'playback': playback,
    'old_url': old_url,
    'lang': ep_lang,
    'up_next': up_next ? up_next.href : undefined,
  }

  console.log("[CR Beta] Adicionando o jwplayer...");
  console.log("[CR Beta] Antiga URL:", old_url);
  addPlayer(appendTo, message, true)
}

function addPlayer(element, playerInfo, beta = false) {
  console.log("[CR Premium] Adicionando o jwplayer...");
  var ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", "frame");
  ifrm.setAttribute("src", "https://mateus7g.github.io/crp-iframe-player/");
  ifrm.setAttribute("width", "100%");
  ifrm.setAttribute("height", "100%");
  ifrm.setAttribute("frameborder", "0");
  ifrm.setAttribute("scrolling", "no");
  ifrm.setAttribute("allowfullscreen", "allowfullscreen");
  ifrm.setAttribute("allow", "autoplay; encrypted-media *");

  element.appendChild(ifrm)

  chrome.storage.sync.get(['forcemp4', 'aseguir', 'cooldown', 'webvideocaster'], function (items) {
    ifrm.onload = function () {
      playerInfo['webvideocaster'] = items.webvideocaster === undefined ? false : items.webvideocaster;
      playerInfo['up_next_cooldown'] = items.cooldown === undefined ? 5 : items.cooldown;
      playerInfo['up_next_enable'] = items.aseguir === undefined ? true : items.aseguir;
      playerInfo['force_mp4'] = items.forcemp4 === undefined ? false : items.forcemp4;
      playerInfo['version'] = '1.2.1';
      playerInfo['noproxy'] = true;
      playerInfo['beta'] = beta;
      ifrm.contentWindow.postMessage(playerInfo, "*");
    };
  });
}

//function ao carregar pagina.
function onloadfunction() {
  var HTML = document.documentElement.innerHTML;
  if (pegaString(HTML, "vilos.config.media = ", ";") != null) {
    importPlayer(); // old CR
  } else if (preservedState != null) {
    importBetaPlayer(); // beta CR
    remove(".erc-modal-portal > .overlay > .content-wrapper", "Free Trial Modal", true, () => document.body.classList = [])
    remove(".erc-watch-premium-upsell", "Premium Sidebar", true)
    registerChangeEpisode();
  }
}

// function pra atualizar pagina quando mudar de episodio pela UI beta
var currentURL = window.location.href;

function registerChangeEpisode() {
  setInterval(async () => {
    if (currentURL !== window.location.href) {
									 
      currentURL = window.location.href
      if (currentURL.includes("/watch/")) {
        const HTML = await fetch(currentURL)
        console.log("[CR Beta] Searching for new INITIAL_STATE")
        preservedState = JSON.parse(pegaString(HTML, "__INITIAL_STATE__ = ", ";"))
        importBetaPlayer(false)
      }
    }
							  
  }, 50)
}

document.addEventListener("DOMContentLoaded", onloadfunction, false);
document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    console.log("[CR Beta] Searching for INITIAL_STATE")
    const HTML = document.documentElement.innerHTML
    preservedState = JSON.parse(pegaString(HTML, "__INITIAL_STATE__ = ", ";"))
  }

  const crBetaStyle = document.createElement('style');
  crBetaStyle.innerHTML = `.video-player-wrapper {
    margin-top: 2rem;
    margin-bottom: calc(-3vh - 7vw);
    height: 57.25vw !important;
    max-height: 82vh !important;
  }`;
  document.head.appendChild(crBetaStyle);
}

function fetch(url) {
  return new Promise(async (resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4)
        if (xhr.status == 200) resolve(xhr.responseText)
        else reject(xhr.statusText)
    }
    xhr.send();
  })
}
