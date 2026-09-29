const form=document.querySelector('[data-form]');
const submit=document.querySelector('[data-submit]');
const status=document.querySelector('[data-status]');
const result=document.querySelector('[data-result]');
const resultKicker=document.querySelector('[data-result-kicker]');
const resultTitle=document.querySelector('[data-result-title]');
const resultBody=document.querySelector('[data-result-body]');
const email=document.querySelector('#contact-email');
const emailError=document.querySelector('[data-email-error]');
const returnButton=document.querySelector('[data-return]');
const scenarioButtons=[...document.querySelectorAll('[data-scenario]')];
const scenarioHelp=document.querySelector('[data-scenario-help]');

const scenarios={
  success:{
    help:'Der Server verarbeitet die Nachricht erfolgreich.',
    kicker:'Erfolg',
    title:'Nachricht angekommen.',
    body:'Der Vorgang ist abgeschlossen und die Seite kann eindeutig bestätigen, was passiert ist.',
    returnLabel:'Eingaben ansehen',
    kind:'success'
  },
  validation:{
    help:'Der Browser akzeptiert die Eingabe, aber der Server weist einen Wert als korrigierbar zurück.',
    kicker:'Eingabe korrigieren',
    title:'Diese E-Mail-Adresse können wir so nicht verwenden.',
    body:'Die anderen Eingaben bleiben erhalten. Der Fehler gehört zum Feld – nicht zum gesamten Dienst.',
    kind:'validation'
  },
  service:{
    help:'Die Eingaben sind in Ordnung, aber der Dienst kann die Anfrage gerade nicht verarbeiten. In diesem Testfall ist bekannt: Die Nachricht wurde nicht verarbeitet.',
    kicker:'Technisches Problem',
    title:'Die Nachricht konnte gerade nicht verarbeitet werden.',
    body:'Kein Feld wird als falsch markiert. Die Eingaben bleiben erhalten, damit eine sichere Recovery möglich bleibt.',
    returnLabel:'Eingaben ansehen',
    kind:'service'
  },
  unknown:{
    help:'Die Verbindung bricht ab, nachdem die Anfrage möglicherweise bereits beim Server angekommen ist.',
    kicker:'Ausgang unklar',
    title:'Wir können gerade nicht sicher sagen, ob die Nachricht angekommen ist.',
    body:'Das ist etwas anderes als „fehlgeschlagen“. Bei folgenreichen Vorgängen darf ein erneuter Versuch nicht blind empfohlen werden.',
    returnLabel:'Eingaben ansehen',
    kind:'unknown'
  }
};

let scenario='success';
let submitting=false;

function clearServerError(){
  email.removeAttribute('aria-invalid');
  emailError.textContent='';
}

function chooseScenario(next,button){
  scenario=next;
  scenarioButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  scenarioHelp.textContent=scenarios[next].help;
  clearServerError();
}

scenarioButtons.forEach(button=>{
  button.addEventListener('click',()=>chooseScenario(button.dataset.scenario,button));
});

function showForm(){
  result.hidden=true;
  form.hidden=false;
  status.textContent='';
  clearServerError();
  form.querySelector('input,textarea,button')?.focus();
}

function showResult(config){
  form.hidden=true;
  result.hidden=false;
  result.dataset.kind=config.kind;
  resultKicker.textContent=config.kicker;
  resultTitle.textContent=config.title;
  resultBody.textContent=config.body;
  returnButton.textContent=config.returnLabel || 'Eingaben ansehen';
  resultTitle.focus();
}

form.addEventListener('submit',event=>{
  event.preventDefault();
  if(submitting)return;

  const submittedScenario=scenario;
  submitting=true;
  clearServerError();
  form.setAttribute('aria-busy','true');
  status.textContent='Wird gesendet … Änderungen ab jetzt gehören nicht mehr zu dieser Anfrage.';
  submit.setAttribute('aria-disabled','true');
  submit.textContent='Wird gesendet …';
  scenarioButtons.forEach(button=>{button.disabled=true});

  window.setTimeout(()=>{
    submitting=false;
    form.setAttribute('aria-busy','false');
    submit.removeAttribute('aria-disabled');
    submit.textContent='Nachricht senden';
    scenarioButtons.forEach(button=>{button.disabled=false});
    status.textContent='';

    const config=scenarios[submittedScenario];

    if(submittedScenario==='validation'){
      email.setAttribute('aria-invalid','true');
      emailError.textContent='Bitte verwende eine andere E-Mail-Adresse.';
      form.hidden=false;
      result.hidden=true;
      status.textContent='Bitte korrigiere die markierte Eingabe.';
      email.focus();
      return;
    }

    showResult(config);
  },650);
});

returnButton.addEventListener('click',showForm);

window.addEventListener('load',()=>{
  window.parent?.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*');
});
new ResizeObserver(()=>window.parent?.postMessage({type:'how-to-web:example-height',height:document.documentElement.scrollHeight},'*')).observe(document.body);