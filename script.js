const days = [
  ["Slow Sunday", "Rest properly today. Prepare gently for the week."],
  ["Fresh Start", "Pick one important task and finish it before anything else."],
  ["Keep Going", "Momentum beats motivation. Do the next small thing."],
  ["Midweek Check", "Review your goals and refocus on what matters."],
  ["Almost There", "Finish strong and tie up loose ends."],
  ["Friday Energy", "Celebrate your wins and plan something you enjoy."],
  ["Free Day", "Relax, see people you love and do something fun."]
];

// One small line illustration per day, matching that day's advice
const S = (inner) => `<svg viewBox="0 0 120 120" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const G = '#e8c872';
const scenes = [
  // Sunday: rest - crescent moon, stars, steaming mug
  ["Moon and a warm cup, resting",
   S(`<path transform="translate(10 -4) scale(.8)" d="M74 22a34 34 0 1 0 22 52A28 28 0 0 1 74 22z" stroke="${G}"/>
      <path d="M28 28v8M24 32h8M98 24v6M95 27h6" stroke="${G}"/>
      <path d="M40 84h34v10a12 12 0 0 1-12 12H52a12 12 0 0 1-12-12z"/><path d="M74 88h6a6 6 0 0 1 0 12h-6"/>
      <path d="M50 76c-3-4 3-6 0-10M60 76c-3-4 3-6 0-10"/>`)],
  // Monday: fresh start - sunrise over the horizon with a check mark
  ["Sunrise over the horizon, a fresh start",
   S(`<path d="M20 78h80"/><path d="M36 78a24 24 0 0 1 48 0" stroke="${G}"/>
      <path d="M60 40v-10M34 50l-7-7M86 50l7-7M24 64h-9M96 64h9" stroke="${G}"/>
      <path d="M46 98l8 8 18-18"/>`)],
  // Tuesday: keep going - steps climbing with an arrow
  ["Steps climbing upward, keep going",
   S(`<path d="M16 100h22V84h22V68h22V52h22"/><path d="M16 100v0"/>
      <path d="M30 70l30-30" stroke="${G}"/><path d="M44 40h16v16" stroke="${G}"/>`)],
  // Wednesday: midweek check - compass
  ["Compass, check your direction",
   S(`<circle cx="60" cy="60" r="38"/><circle cx="60" cy="60" r="3"/>
      <path d="M60 22v8M60 90v8M22 60h8M90 60h8"/>
      <path d="M74 46L56 56 46 74l18-10z" stroke="${G}"/>`)],
  // Thursday: almost there - mountain with a flag on the summit
  ["Mountain with a flag at the summit",
   S(`<path d="M12 98l34-52 18 26 14-18 30 44z"/><path d="M46 46V20" stroke="${G}"/>
      <path d="M46 20l20 6-20 8" stroke="${G}"/>`)],
  // Friday: celebrate - trophy with sparkles
  ["Trophy and sparkles, celebrate your wins",
   S(`<path d="M42 30h36v22a18 18 0 0 1-36 0z"/><path d="M42 36H30v6a12 12 0 0 0 12 12M78 36h12v6a12 12 0 0 1-12 12"/>
      <path d="M60 70v14M46 98h28M50 84h20v14H50z"/>
      <path d="M20 20v10M15 25h10M100 18v8M96 22h8M96 84v8M92 88h8" stroke="${G}"/>`)],
  // Saturday: free day - bicycle under the sun
  ["Bicycle and sun, a free day",
   S(`<circle cx="92" cy="26" r="9" stroke="${G}"/>
      <circle cx="32" cy="84" r="16"/><circle cx="88" cy="84" r="16"/>
      <path d="M32 84l16-30h28l12 30M48 54l12 30h-0M44 48h12M74 54l-4-8h8"/><path d="M60 84L48 54"/>`)]
];

let offset = 0;
const $ = id => document.getElementById(id);

function show() {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const [title, advice] = days[d.getDay()];
  $('title').textContent = title;
  $('art').innerHTML = scenes[d.getDay()][1];
  $('art').setAttribute('aria-label', scenes[d.getDay()][0]);
  $('advice').textContent = advice;
  $('date').textContent = d.toLocaleDateString(undefined,
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
$('next').addEventListener('click', () => { offset++; show(); });

$('photo').addEventListener('change', () => {
  const f = $('photo').files[0];
  $('err').textContent = '';
  if (!f) return;
  if (!f.type.startsWith('image/')) { $('err').textContent = 'Choose an image file.'; return; }
  const fr = new FileReader();
  fr.onerror = () => { $('err').textContent = 'Could not read that photo.'; };
  fr.onload = () => {
    const img = new Image();
    img.onerror = () => { $('err').textContent = 'Could not open that photo. Try a JPG or PNG.'; };
    img.onload = () => {
      const s = Math.min(1, 900 / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * s);
      c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      $('mine').src = c.toDataURL('image/jpeg', 0.85);
      $('mine').hidden = false;
      $('stack').classList.add('layered');
    };
    img.src = fr.result;
  };
  fr.readAsDataURL(f);
});
show();
