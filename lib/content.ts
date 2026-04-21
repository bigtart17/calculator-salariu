import { calculateFromGross } from "@/lib/tax-engine/calculator";
import { SalaryInput, TaxPeriodId } from "@/lib/tax-engine/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://netdinbrut.ro";

export const defaultCalculatorState: SalaryInput = {
  mode: "grossToNet",
  amount: 7000,
  bonus: 0,
  dependents: 0,
  sector: "standard",
  taxPeriodId: "2026-h1",
  isBaseJob: true,
  applyMinimumWageRelief: true
};

export const programmaticExamples = [3000, 4050, 5000, 7000, 10000, 15000];

export const faqItems = [
  {
    question: "Cum se calculează salariul net din brut în România?",
    answer:
      "Salariul net se obține după scăderea CAS, CASS și a impozitului pe venit din salariul brut. În anumite cazuri se aplică deducere personală, facilități pentru salariul minim sau scutiri sectoriale."
  },
  {
    question: "Cum aflu salariul brut dacă știu netul dorit?",
    answer:
      "Calculatorul folosește un algoritm invers de tip binary search pentru a aproxima rapid brutul necesar astfel încât netul final să corespundă rezultatului dorit, inclusiv în scenarii cu bonusuri."
  },
  {
    question: "Pot calcula și costul total pentru angajator?",
    answer:
      "Da. Pe lângă brut și net, afișăm CAM și costul total lunar și anual suportat de angajator, util pentru ofertare, recrutare și bugetare."
  },
  {
    question: "Sunt incluse deducerile personale și facilitățile fiscale?",
    answer:
      "Da, într-o formă modulară și transparentă. Poți selecta perioada fiscală, numărul de persoane în întreținere, funcția de bază și sectorul de activitate."
  },
  {
    question: "Calculatorul este potrivit pentru IT, construcții și agricultură?",
    answer:
      "Da, există profiluri dedicate pentru aceste sectoare. Totuși, eligibilitatea reală depinde de condiții legale suplimentare, cum ar fi codurile CAEN, plafonul de venit și cifra de afaceri a angajatorului."
  },
  {
    question: "Rezultatul poate fi distribuit sau salvat?",
    answer:
      "Da. Calculatorul generează URL-uri shareable pentru fiecare simulare, iar rezultatele pot fi copiate rapid pentru oferte, negocieri sau comparații."
  }
];

export function buildSalaryExample(gross: number, taxPeriodId: TaxPeriodId = "2026-h1") {
  return calculateFromGross({
    ...defaultCalculatorState,
    amount: gross,
    taxPeriodId
  });
}

export function getPageCopy() {
  return {
    title: "Calculator salariu net din brut 2026 România",
    heroTitle: "Calculator salariu net din brut 2026 România",
    heroSubtitle:
      "Cel mai clar calculator de salariu pentru piața din România: brut → net, net → brut, cost angajator, proiecții anuale, deduceri personale și profiluri fiscale pentru IT, construcții și agricultură.",
    ctaPrimary: "Calculează acum",
    calculatorTitle: "Calculator net ↔ brut",
    calculatorLead:
      "Actualizat pentru scenarii salariale 2026 și construit pentru viteză, transparență și conversie. Rezultatele se actualizează instant."
  };
}

export const longFormRomanianContent = {
  intro:
    "Dacă vrei să înțelegi cu adevărat diferența dintre salariul brut și salariul net în România, ai nevoie de explicații clare, context, și un instrument potrivit. Acest calculator de salariu net - brut este gândit exact pentru asta, oferindu-ți o înțelegere completă a modului în care se formează salariul tău.",
  sections: [
    {
      id: "cum-se-calculeaza",
      title: "Cum se calculează salariul net",
      paragraphs: [
        "În forma standard, salariul net rezultă după reținerea contribuției la pensii (CAS), a contribuției la sănătate (CASS) și a impozitului pe venit din salariul brut negociat în contract. Pentru 2026, în scenariul standard folosit de calculator, CAS este 25%, CASS este 10%, iar impozitul este 10% aplicat asupra bazei impozabile. Baza impozabilă nu este egală cu brutul, ci cu suma rămasă după scăderea contribuțiilor sociale și a deducerii personale aplicabile.",
        "De aceea două persoane cu același salariu brut pot primi neturi diferite. Numărul de persoane aflate în întreținere, existența funcției de bază, eventuala facilitate pentru salariul minim și regimul fiscal sectorial pot modifica semnificativ rezultatul final.",
        "În această aplicație, calculul este modular. Asta înseamnă că poți schimba perioada fiscală, poți activa deduceri și poți vedea imediat cum se modifică netul lunar, netul anual și costul total pentru angajator."
      ]
    },
    {
      id: "ce-taxe-platesti",
      title: "Ce taxe plătești în România",
      paragraphs: [
        "Cele mai importante rețineri pentru salariile clasice din România sunt CAS și CASS. CAS finanțează sistemul public de pensii și se aplică procentual asupra bazei de calcul. CASS finanțează sistemul de sănătate și funcționează separat de CAS. După aceste contribuții se calculează baza pentru impozitul pe venit, care la rândul său poate fi redusă prin deducere personală sau anumite facilități fiscale.",
        "Pe lângă taxele suportate de angajat, angajatorul plătește și contribuția asiguratorie pentru muncă, de regulă CAM 2,25% în scenariul standard. Din perspectiva bugetului real al companiei, costul total cu un angajat este întotdeauna mai mare decât salariul brut din contract.",
        "În anumite domenii, precum IT, construcții sau agricultură și industria alimentară, pot exista tratamente fiscale preferențiale. Acestea depind însă de condiții suplimentare: funcție de bază, plafon de venit, coduri CAEN eligibile, ponderea cifrei de afaceri și alte criterii stabilite de legislație."
      ]
    },
    {
      id: "exemple-calcul",
      title: "Exemple de calcul salariu",
      paragraphs: [
        "Pentru a înțelege mai ușor diferențele, este util să vezi exemple reale pentru salarii frecvent întâlnite, precum 3000 lei, 4050 lei, 5000 lei, 7000 lei, 10000 lei sau 15000 lei brut.",
        "Pentru fiecare dintre aceste valori, poți vedea exact salariul net rezultat, CAS, CASS, și impozitul reținut, eventualele deduceri aplicate, costul total pentru angajator, diferența dintre calculul lunar și anual.",
        "Acest tip de transparență te ajută să iei decizii mai bune, fie că îți negociezi salariul sau compari oferte de muncă"
      ]
    },
    {
      id: "brut-vs-net",
      title: "Salariu brut vs net explicat",
      paragraphs: [
        "Salariul brut este suma contractuală înainte de taxe și contribuții. Salariul net este suma pe care o primești efectiv în cont. Diferența dintre ele este esențială în orice negociere salarială, iar confuzia apare frecvent atunci când ofertele sunt comunicate în termeni diferiți. Un angajator poate vorbi despre brut, în timp ce un candidat gândește în net.",
        "De aceea modul net → brut este la fel de important ca modul brut → net. Dacă știi cât vrei să primești „în mână”, instrumentul calculează brutul estimat care duce la acel rezultat, ținând cont de bonusuri și profilul fiscal selectat. Asta transformă produsul dintr-un simplu calculator într-un instrument activ de negociere salarială.",
        "Acest lucru îți oferă control real în negocieri și te ajută să înțelegi exact ce înseamnă o ofertă de muncă."
      ]
    }
  ],
  outro:
    "Într-o piață a muncii tot mai competitivă, diferența o face modul în care înțelegi și negociezi suma din ofertă. Un calcul corect și rapid îți oferă claritate, încredere și o poziție mai bună în discuțiile salariale. În loc să estimezi, poți lua decizii bazate pe cifre reale."
};
