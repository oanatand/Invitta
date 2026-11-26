// Whole-site Romanian → English translation applied to rendered text.
// Components keep Romanian source copy; when English is active, a DOM
// observer swaps matching text nodes and attributes, and restores them on RO.

export type Lang = "ro" | "en";
export const LANG_KEY = "invitta-lang";
export const LANG_EVENT = "invitta-lang-change";

const DICT: Record<string, string> = {
  // Navigation & common
  "Funcționalități": "Features", "Modele": "Designs", "Prețuri": "Pricing", "Acasă": "Home",
  "Creează invitația": "Create invitation", "Profilul meu": "My profile", "Panoul meu": "My dashboard",
  "Invitațiile mele": "My invitations", "Facturile mele": "My invoices", "Deconectare": "Log out",
  "Nicio invitație încă": "No invitations yet", "Începe prima ta invitație": "Start your first invitation", "Alege un model din colecție și personalizează-l.": "Choose a model from the collection and personalize it.", "Alege un model": "Choose a model", "Încă nu ai o invitație. Alege un model pentru a începe.": "You don't have an invitation yet. Choose a model to get started.",
  "Începe prin a alege un model": "Start by choosing a model", "Editarea invitației, confirmările și mesele apar după ce alegi un model din colecție.": "The invitation editor, RSVPs and tables appear once you choose a model from the collection.",
  "Primul pas": "First step", "Alege modelul invitației": "Choose your invitation's model", "Deschide colecția, vezi demo-urile și alege modelul care vi se potrivește.": "Open the collection, see the demos and choose the model that suits you.",
  "Contul tău": "Your account", "Detaliile mele": "My details", "Telefon": "Phone",
  "Schimbă parola": "Change password", "Parola curentă": "Current password", "Parola nouă": "New password",
  "Confirmă parola": "Confirm password", "Parolele nu coincid.": "Passwords don't match.",
  "Parola nouă trebuie să aibă minim 8 caractere.": "The new password must be at least 8 characters.",
  "Parola a fost schimbată.": "Your password has been changed.", "Descarcă PDF": "Download PDF",
  "Invitație nouă": "New invitation", "Schimbă modelul": "Change design", "Vezi invitația": "View invitation", "12 Martie 2026": "12 March 2026",
  "Activă · 14 Iunie 2026": "Active · 14 June 2026", "invitta.ro/ioana-andrei · 84 confirmări": "invitta.ro/ioana-andrei · 84 RSVPs",
  "Limbă": "Language", "Salvează": "Save", "Anulează": "Cancel", "Demo": "Demo",
  "Alege Invitația": "Choose this invitation", "Descoperă colecțiile": "Discover the collections",
  "Vezi o invitație demo": "View a demo invitation", "← Înapoi": "← Back", "Înapoi": "Back",
  "Înapoi la editor": "Back to editor", "Înapoi la panou": "Back to dashboard",
  "Se încarcă…": "Loading…", "✓ Salvat": "✓ Saved", "Reîncearcă": "Try again",
  "Ceva nu a mers bine": "Something went wrong", "Reîncarcă pagina sau întoarce-te acasă.": "Reload the page or go back home.",
  "Pagină negăsită": "Page not found", "Pagina pe care o cauți nu există sau a fost mutată.": "The page you are looking for doesn't exist or has been moved.",
  "Autentificare": "Sign in", "Autentifică-te": "Sign in", "Intră în cont": "Sign in", "Creează contul": "Create account",
  "Bun venit înapoi": "Welcome back", "Parolă": "Password", "Email": "Email", "E-mail": "Email",
  "Numele vostru": "Your names", "Ai deja cont?": "Already have an account?", "Nu ai cont?": "Don't have an account?",
  "Creează unul": "Create one", "Creează ceva": "Create something",
  "Două minute. Fără card de credit.": "Two minutes. No credit card.",
  "Cea mai elegantă modalitate de a-ți invita oaspeții.": "The most elegant way to invite your guests.",

  // Landing
  "Invitații online elegante pentru nunta voastră.": "Elegant online invitations for your wedding.",
  "Creează invitația perfectă, primește confirmările invitaților și organizează mesele simplu, într-un singur loc.": "Create the perfect invitation, collect your guests' RSVPs and arrange tables simply, all in one place.",
  "Povestea voastră merită o invitație pe măsură. Invitații digitale elegante, confirmări RSVP și aranjarea meselor, într-un singur loc.": "Your story deserves an invitation to match. Elegant digital invitations, RSVPs and table seating, all in one place.",
  "Atelier de invitații digitale": "Digital invitation atelier", "Colecția 2026": "The 2026 Collection",
  "Colecții": "Collections", "O colecție": "A collection", "pentru fiecare poveste": "for every story",
  "Momentul vostru,": "Your moment,", "doar al vostru": "yours alone", "Totul începe cu": "It all begins with",
  "o invitație.": "an invitation.", "Doar esențialul,": "Only the essentials,", "gândit cu grijă": "thoughtfully designed",
  "pe măsură.": "to match.", "fără griji": "without worry", "în buzunarul fiecăruia": "in everyone's pocket",
  "Cum funcționează": "How it works", "Trei pași simpli, fără efort": "Three simple, effortless steps",
  "Alege un design": "Choose a design", "Trimite invitația": "Send the invitation", "Primește confirmările": "Receive RSVPs",
  "Selectează din colecția noastră de invitații editoriale, creată cu grijă.": "Select from our carefully curated collection of editorial invitations.",
  "Personalizează design-ul și conținutul": "Personalize the design and content",
  "Distribuie linkul personalizat prin WhatsApp, e-mail sau social media.": "Share your personal link via WhatsApp, email or social media.",
  "Vezi toate răspunsurile într-un singur loc, elegant și simplu.": "See every response in one place, elegant and simple.",
  "01 — Personal": "01 — Personal", "02 — Împărtășit": "02 — Shared", "03 — Liniștit": "03 — Calm",
  "Tot ce ai nevoie": "Everything you need", "Experiența": "The experience", "Experiența completă": "The complete experience",
  "Invitație online": "Online invitation", "Confirmări RSVP": "RSVP confirmations", "Aranjare la mese": "Table seating",
  "Guest list elegant": "Elegant guest list", "Link personalizat": "Personal link",
  "Pagina ta personalizată, mereu disponibilă.": "Your personal page, always available.",
  "Răspunsurile invitaților, ordonate frumos.": "Guest responses, beautifully organized.",
  "Drag & drop intuitiv, vizual și satisfăcător.": "Intuitive, visual and satisfying drag & drop.",
  "Listă completă cu preferințe și mesaje.": "A complete list with preferences and messages.",
  "invitta.ro/ioana-andrei — simplu, memorabil.": "invitta.ro/ioana-andrei — simple, memorable.",
  "Numele, data, locurile, povestea și fotografiile voastre. Schimbați orice și vedeți invitația prinzând viață în timp real.": "Your names, date, venues, story and photos. Change anything and watch the invitation come to life in real time.",
  "Un singur link, trimis pe WhatsApp. Invitații deschid invitația pe telefon și confirmă prezența în câteva secunde.": "One link, sent on WhatsApp. Guests open the invitation on their phone and RSVP in seconds.",
  "Toate confirmările într-un singur loc. Așezați invitații la mese cu un simplu gest și vedeți imediat locurile libere.": "All RSVPs in one place. Seat guests with a single gesture and instantly see free seats.",
  "Fiecare design este compus ca o papetărie de nuntă — tipografie atentă, ritm și liniște.": "Each design is composed like wedding stationery — careful typography, rhythm and calm.",
  "Paletă": "Palette", "Paletă: alb, gri și negru": "Palette: white, grey and black",
  "Romantic · Delicat": "Romantic · Delicate", "Cald · Toscan": "Warm · Tuscan", "Sofisticat · Nocturn": "Sophisticated · Nocturnal",
  "Buchet de bujori": "Peony bouquet",
  "Mirele și mireasa mergând pe o alee, mireasa privind peste umăr": "The groom and bride walking down a path, the bride looking over her shoulder",
  "Mireasa și mirele întinzându-și mâinile unul spre celălalt": "The bride and groom reaching out to each other",
  "Iubit de cuplurile noastre": "Loved by our couples", "Povești adevărate": "Real stories",
  "Invitația noastră a primit atâtea complimente. Totul a fost extrem de simplu și elegant.": "Our invitation received so many compliments. Everything was extremely simple and elegant.",
  "Am organizat 180 de invitați fără stres. Funcția de aranjare a meselor e magică.": "We organized 180 guests stress-free. The table seating feature is magic.",
  "Pur și simplu frumos. Părea că am angajat un designer doar pentru noi.": "Simply beautiful. It felt like we'd hired a designer just for us.",
  "Mai 2025": "May 2025", "Iulie 2025": "July 2025", "August 2025": "August 2025",
  "Alege pachetul potrivit": "Choose the right plan", "Plată unică. Fără abonament.": "One-time payment. No subscription.",
  "Pentru cuplurile care iubesc detaliile": "For couples who love the details",
  "Începe gratuit": "Start for free", "Fără limite": "No limits", "Invitați nelimitați": "Unlimited guests",
  "200 invitați": "200 guests", "1 design": "1 design", "Toate design-urile": "All designs",
  "Personalizare avansată": "Advanced customization", "Personalizare completă": "Full customization",
  "Domeniu propriu": "Custom domain", "Designer dedicat": "Dedicated designer", "Suport prioritar": "Priority support",
  "Drag & drop pentru așezarea perfectă": "Drag & drop for perfect seating",
  "Creează invitația voastră": "Create your invitation", "Cu drag, pentru cei dragi.": "With love, for your loved ones.",
  "Invitații digitale create cu eleganță. Momente speciale, împărtășite cu cei dragi.": "Digital invitations crafted with elegance. Special moments, shared with loved ones.",
  "Linkul tău: invitta.ro/ioana-andrei": "Your link: invitta.ro/ioana-andrei",
  "Cel mai popular": "Most popular", "Popular": "Popular",

  // Dashboard
  "Bine ai venit, Ioana": "Welcome, Ioana", "Ce vrei să faci astăzi?": "What would you like to do today?",
  "Totul merge perfect pentru ziua voastră. Iată o privire calmă asupra organizării.": "Everything is on track for your day. Here is a calm overview of your planning.",
  "Confirmați": "Confirmed", "În așteptare": "Pending", "Refuzați": "Declined", "Total invitați": "Total guests",
  "Confirmat": "Confirmed", "Refuzat": "Declined", "Toți": "All",
  "Editează invitația": "Edit invitation", "Vezi RSVP-uri": "View RSVPs", "Aranjează mesele": "Arrange tables",
  "Distribuie invitația": "Share invitation", "Invitația": "Invitation", "Invitația voastră": "Your invitation",
  "Confirmări": "RSVPs", "Mese": "Tables", "Invitați": "Guests", "Invitații voștri": "Your guests",
  "Confirmările și mesajele invitaților": "Your guests' RSVPs and messages",
  "Caută invitat...": "Search guest...", "Exportă lista": "Export list", "Niciun invitat găsit.": "No guests found.",
  "Nume": "Name", "Status": "Status", "Persoane": "Guests", "Masă": "Table", "Meniu": "Menu",
  "Mesaj": "Message", "Activă": "Active", "Ascunsă": "Hidden",
  "14 Iunie 2026 · 86 zile rămase": "June 14, 2026 · 86 days left", "14 Iunie 2026": "June 14, 2026",
  "5 Septembrie 2026": "September 5, 2026",

  // Tables
  "Așezarea la mese": "Table seating", "Masă nouă": "New table", "Masa nouă": "New table", "Grup nou": "New group",
  "Nicio masă încă": "No tables yet", "Folosește „Masă nouă\" pentru a începe": "Use “New table” to get started",
  "Pentru a începe": "To get started", "Nume masă *": "Table name *", "Capacitate *": "Capacity *",
  "Formă": "Shape", "Rotundă": "Round", "Pătrat": "Square", "Ovală": "Oval", "Dreptung.": "Rect.",
  "Note (opțional)": "Notes (optional)", "Note despre această masă...": "Notes about this table...",
  "Prezidiu": "Head table", "Salonul Principal": "Main hall", "Element nou": "New item",
  "Sus": "Up", "Jos": "Down", "Culoare": "Color", "Locuri": "Seats", "Neasignați": "Unassigned",

  // Builder
  "Personalizați fiecare detaliu. Modificările sunt salvate automat.": "Customize every detail. Changes are saved automatically.",
  "Editor · Informații": "Editor · Details", "Previzualizare": "Preview",
  "Deschide previzualizarea într-o pagină nouă": "Open the preview in a new page",
  "Secțiuni": "Sections", "Secțiuni invitație": "Invitation sections", "Cuprins invitație": "Invitation contents",
  "Rearanjează ordinea sau dezactivează secțiuni pe care nu le vrei": "Reorder or turn off sections you don't want",
  "Informații generale": "General information", "Sărbătoriți": "The couple", "Sărbătoriți,": "The couple,",
  "Despre sărbătoriți": "About the couple", "Mireasă": "Bride", "Mire": "Groom",
  "Prenume mireasă": "Bride's first name", "Nume mireasă": "Bride's last name",
  "Prenume mire": "Groom's first name", "Nume mire": "Groom's last name",
  "Părinții și nașii": "Parents and godparents", "Numele părinților": "Parents' names", "Numele nașilor": "Godparents' names",
  "Etichetă părinți": "Parents label", "Etichetă nași": "Godparents label",
  "Cum sunt prezentați părinții": "How the parents are introduced",
  "Ex: Maria și Cristi Popescu": "E.g. Maria and Cristi Popescu", "Ex: Andreea și Vlad Marin": "E.g. Andreea and Vlad Marin",
  "Dragii noștri părinți": "Our dear parents", "Părinții noștri": "Our parents", "Nașii": "Godparents",
  "Împreună cu nașii": "Together with our godparents",
  "Detalii locații": "Venue details", "Detaliile evenimentului": "Event details",
  "Cununia civilă": "Civil ceremony", "Cununia religioasă": "Religious ceremony", "Petrecerea": "Reception",
  "Locație cununie religioasă": "Religious ceremony venue", "Denumire local": "Venue name",
  "Adresa": "Address", "Orașul și țara": "City and country", "Data și ora": "Date and time", "Ora": "Time",
  "Data nunții": "Wedding date", "Data nunții și textele din contor": "Wedding date and countdown texts",
  "Numărătoare inversă": "Countdown", "Secțiune numărătoare": "Countdown section",
  "Cum apare data afișată": "How the date is displayed", "Text înlocuire dată": "Date override text",
  "Text înlocuire nume": "Name override text",
  "Prima pagină": "Home section", "Imaginea de fundal și textele din antet": "Background image and header texts",
  "Imagine de fundal pentru prima pagina": "Background image for the first page",
  "Filtru imagine de pe prima pagină": "Home image filter", "Întunecă imaginea pentru lizibilitate": "Darken the image for readability",
  "Text mic din antet": "Small header text", "Font pentru textul din antet": "Header text font",
  "Text introducere": "Intro text", "Fără imagine": "No image", "Încarcă imagine": "Upload image",
  "Galerie foto": "Photo gallery", "Muzică & video": "Music & video", "Muzică de fundal": "Background music",
  "ID video Youtube": "YouTube video ID", "Doar codul, ex: Lvy4vG4Ns94": "Code only, e.g. Lvy4vG4Ns94",
  "Secțiune descriere": "Description section", "Secțiune mulțumire": "Thank-you section", "Mulțumire": "Thank you",
  "Text mesaj personalizat": "Custom message text", "Titlu": "Title", "Descriere": "Description",
  "Opțiuni confirmare": "RSVP options", "Termen limită confirmare": "RSVP deadline",
  "Întreabă numărul de persoane": "Ask for number of guests", "Întreabă preferințele de meniu": "Ask for menu preferences",
  "Paleta și tema invitației": "Invitation palette and theme", "Fonturi": "Fonts", "Culori": "Colors",
  "Lasă necompletată dacă nu o vrei în invitație.": "Leave empty if you don't want it in the invitation.",
  "Povestea voastră": "Your story", "Povestea": "Story", "Program": "Schedule", "Confirmare": "RSVP",
  "Confirmare RSVP": "RSVP confirmation", "Locația": "Location", "Hartă": "Map", "Vezi hartă": "View map",
  "Ne-am cunoscut într-o seară de toamnă, în Cișmigiu...": "We met one autumn evening in Cișmigiu...",
  "Ne-am cunoscut într-o seară de toamnă, în Cișmigiu. Au trecut șapte ani, două case și nenumărate amintiri.": "We met one autumn evening in Cișmigiu. Seven years, two homes and countless memories later.",

  // Invitation / preview
  "Modul de previzualizare — doar vizualizare": "Preview mode — view only",
  "Ne căsătorim!": "We're getting married!", "Nunta noastră": "Our wedding", "Vino alături de noi": "Join us",
  "Vă invităm la nunta noastră": "You're invited to our wedding",
  "Astăzi vă invităm să ne fiți alături în cea mai frumoasă zi a vieții noastre.": "We invite you to join us on the most beautiful day of our lives.",
  "↓ Descoperă povestea": "↓ Discover the story", "Povestea noastră": "Our story", "Cum totul a început": "How it all began",
  "Primul capitol": "The first chapter", "Programul zilei": "The day's schedule", "Când și unde": "When and where",
  "Când?": "When?", "Detalii mai jos.": "Details below.",
  "Cocktail de bun venit": "Welcome cocktail", "Cina festivă": "Festive dinner", "Dansul mirilor": "First dance",
  "Și petrecere până dimineața": "And a party until dawn",
  "Cununia religioasă va avea loc la": "The religious ceremony will take place at",
  "pe urmă vom sărbători evenimentul la": "then we will celebrate at",
  "Deschide în Google Maps →": "Open in Google Maps →",
  "Vei participa?": "Will you attend?", "Particip": "Attending", "Nu particip": "Not attending",
  "Particip cu drag": "Gladly attending", "Nu pot ajunge": "Can't make it", "Nu pot să particip": "I can't attend",
  "Da, confirm prezența": "Yes, I'll attend", "Confirmă prezența": "Confirm attendance",
  "Număr persoane": "Number of guests", "Numărul de persoane": "Number of guests",
  "Alege număr persoane ⌄": "Choose number of guests ⌄", "Alege tip meniu ⌄": "Choose menu type ⌄",
  "Vei veni cu copii? ⌄": "Will you bring children? ⌄", "Dorești cazare? ⌄": "Do you need accommodation? ⌄",
  "Tip meniu": "Menu type", "Preferințe meniu": "Menu preferences",
  "Mesaj pentru miri (opțional)": "Message for the couple (optional)", "Mesaj pentru miri": "Message for the couple",
  "Vrei să ne transmiți ceva?": "Anything you'd like to tell us?",
  "Distribuie": "Share", "Copiază linkul": "Copy link", "✓ Copiat": "✓ Copied", "Deschide": "Open", "Închide": "Close", "Se generează linkul…": "Generating link…",
  "Copiază linkul și trimite-l invitaților. Oricine îl deschide vede invitația.": "Copy the link and send it to your guests. Anyone who opens it sees the invitation.",
  "Imaginile încărcate de pe dispozitiv nu sunt incluse în link; cele alese din galerie apar normal.": "Images uploaded from your device are not included in the link; gallery images appear normally.", "Trimite confirmarea": "Send RSVP",
  "Te rugăm să confirmi până la 1 Mai 2026.": "Please RSVP by May 1, 2026.",

  // Public models page & demo content
  "Deschide demo-ul oricărui model, fără cont. Doar editarea invitației și confirmările au nevoie de autentificare.": "Open any model's demo without an account. Only editing the invitation and RSVPs need sign-in.",
  "Vezi demo": "View demo", "Alege acest model": "Choose this model",
  "Nu știi ce ți se potrivește? Vezi pachetele și prețurile.": "Not sure what suits you? See the plans and prices.",
  "Vezi toate modelele": "See all designs", "Înapoi acasă": "Back home", "Sau": "Or",
  "vezi modelele fără cont": "browse the designs without an account",
  "vezi mai întâi modelele": "see the designs first",
  "Bine ai venit": "Welcome", "Vezi modelele și demo-urile fără cont.": "Browse the designs and demos without an account.",
  "O vară în Positano": "A summer in Positano", "O seară de iarnă": "A winter evening",
  "O dimineață de primăvară": "A spring morning",
  "Ne-am promis unul altuia pe o terraceță deasupra mării, între lămâi și apus. Ne place să ne spuneți povestea noastră exact așa cum este: caldă, lentă și plină de soare.": "We promised each other on a little terrace above the sea, between lemons and sunset. We like to tell our story exactly as it is: warm, slow and full of sun.",
  "Andrei a întrebat-o pe Ioana să se mărite cu el într-o seară de Crăciun, într-un hol plin de lumini. Ne place să ne spunem povestea în ton cu ziua: elegantă, nocturnă și puțin cinematografică.": "Andrei asked Ioana to marry him on a Christmas evening, in a hall full of lights. We like to tell our story in keeping with the day: elegant, nocturnal and a little cinematic.",
  "Ne-am cunoscut la o târg de flori, într-o dimineață de primăvară, amândoi căutând aceeași lalea. Ne place să ne spunem povestea simplu, cu flori, cafea și multă răbdare.": "We met at a flower market on a spring morning, both reaching for the same tulip. We like to tell our story simply, with flowers, coffee and a lot of patience.",
  "Grădina Villei Aurora": "Villa Aurora's garden",
  "Aperitiv în livadă": "Aperitifs in the orchard", "Sub măslii și lumânări": "Among olive trees and candles",
  "Cina italiană": "Italian dinner", "Terasa cu pergole": "The pergola terrace",
  "Petrecere până dimineața": "Party until morning", "Și prima dansare a mirilor": "And the couple's first dance",
  "Salonul de Oglinzi": "The Mirrors Hall", "Cina de gală": "Gala dinner", "Sala Balurilor": "The Ballroom",
  "Primul dans": "The first dance", "În sunete de viori": "To the sound of violins",
  "Grădina cu trandafiri": "The rose garden", "Ceai și prăjituri": "Tea and cake",
  "În sere, sub lumânări": "In the greenhouses, by candlelight", "Șura de lemn": "The wooden barn",
  "Dans sub lumânări": "Dancing under candles", "Biserica Sfântul Anton": "Saint Anthony Church",
  "Sat Manasia, jud. Ialomița": "Manasia village, Ialomița county",
  "Sinaia, jud. Prahova": "Sinaia, Prahova county", "București": "Bucharest",
  "Brașov, jud. Brașov": "Brașov, Brașov county",
  "Mulțumim!": "Thank you!", "Confirmarea ta a fost trimisă cu drag.": "Your RSVP has been sent with love.",
  "Vă mulțumim că ne sunteți alături.": "Thank you for being with us.",
  "Cu drag": "With love", "Cu drag, Ioana & Andrei": "With love, Ioana & Andrei",
  "Powered by Invitta RSVP": "Powered by Invitta RSVP",
  "Meniu clasic": "Classic menu", "Meniu vegetarian": "Vegetarian menu", "Meniu copii": "Kids menu",
  "Clasic": "Classic", "Vegetarian": "Vegetarian", "Copii": "Kids", "Fără preferințe": "No preference",
  "zile": "days", "ore": "hours", "minute": "minutes", "secunde": "seconds",
  "Zile": "Days", "Ore": "Hours", "Minute": "Minutes", "Secunde": "Seconds", "și": "and",
  // Extra
  "Povestea voastră merită o invitație": "Your story deserves an invitation", "Pur · Atemporal": "Pure · Timeless",
  "Nu doar o invitație.": "Not just an invitation.", "al zilei voastre.": "of your day.",
  "Mireasa": "Bride", "Mirele": "Groom", "Data": "Date", "Începe personalizarea": "Start personalizing",
  "RSVP de bază": "Basic RSVP", "Alege": "Choose", "Recomandat": "Recommended", "50 invitați": "50 guests",
  "Nu ai cont încă?": "Don't have an account yet?", "🖼  Galerie": "🖼  Gallery", "Galerie": "Gallery",
  "↑  Încarcă poză": "↑  Upload photo",
  "🖼  Fundal": "🖼  Background", "🖼  Fundal ✓": "🖼  Background ✓",
  "Rearanjează ordinea, dezactivează secțiuni sau alege o imagine de fundal pentru fiecare": "Reorder, hide sections or pick a background image for each one",
  "Sursă": "Source", "Dimensiuni": "Dimensions", "Mărime": "Size", "Încărcată de tine": "Uploaded by you", "🗑  Șterge": "🗑  Delete", "Șterge": "Delete",
  "* Prin încărcarea pozelor, confirmi că imaginile îți aparțin și nu încalcă restricții de drept de autor.": "* By uploading photos, you confirm the images are yours and don't infringe copyright.",
  "Sumar": "Summary", "Ajutor": "Help", "Salvat automat": "Saved automatically", "Neasignați (": "Unassigned (",
  "partener": "partner", "libere": "free", "· Prezidiu": "· Head table", "locuri ocupate ·": "seats taken ·", "mese": "tables",
  "standard": "standard", "vegetarian": "vegetarian", "vegan": "vegan",
  "Unde?": "Where?", "Cazare": "Accommodation", "Până la": "By", "din Săliștea de Sus": "in Săliștea de Sus",
  "nunta noastră": "our wedding", "Familia Dumitrescu": "The Dumitrescu family", "Domeniul Manasia · Terasă": "Domeniul Manasia · Terrace",
  "Ne-am cunoscut într-o seară de toamnă, în Cișmigiu. Au trecut șapte ani, două case și nenumărate amintiri. Astăzi vă invităm să ne fiți alături în cea mai frumoasă zi a vieții noastre.": "We met one autumn evening in Cișmigiu. Seven years, two homes and countless memories later, we invite you to join us on the most beautiful day of our lives.",
  "Andreea și Vlad Marin": "Andreea and Vlad Marin", "Maria și Cristi Popescu": "Maria and Cristi Popescu", "Ioana și Mihai Ionescu": "Ioana and Mihai Ionescu",
  "Petru și Tudorița Vlad": "Petru and Tudorița Vlad",
  // Evening timeline & dinner menu (default copy + editor)
  "Seara": "The night", "Programul serii": "Evening schedule", "Cina": "The dinner", "Meniul": "The menu",
  "Program și meniu": "Schedule & menu", "Ceremonia": "Ceremony",
  "Drumul de la biserică până la locația petrecerii durează zece minute, iar vremea poate fi răcoroasă.": "The drive from the church to the party venue takes ten minutes, and the weather may be chilly.",
  "La biserică · intrarea se face cu 15 minute mai devreme": "At the church · please arrive 15 minutes early",
  "Vin fiert și cocktailuri": "Mulled wine & cocktails", "În foaier, sub candelabre": "In the foyer, under the chandeliers",
  "Cina la lumina lumânărilor": "Candlelit dinner", "În salonul principal": "In the main hall",
  "Urmat de dansul nașilor și al părinților": "Followed by the godparents' and parents' dance",
  "Tortul mirilor": "The wedding cake", "Un pahar de șampanie pentru toți invitații": "A glass of champagne for every guest",
  "Ultimul dans": "Last dance", "Ne vedem pe ringul de dans până la ultima melodie": "See you on the dance floor until the very last song",
  "Domeniul Manasia · 19:30": "Domeniul Manasia · 7:30 PM",
  "Pentru început": "To begin", "Apoi": "Then", "Pentru final": "To finish", "Toată noaptea": "All night",
  "Scoici sote, sos de unt cu șampanie": "Seared scallops, champagne beurre blanc",
  "Mușchi de vită, trufe negre, cartofi sufflé": "Beef fillet, black truffle, pommes soufflées",
  "sau risotto cu ciuperci pentru vegetarieni": "or mushroom risotto for vegetarians",
  "Croquembouche cu castane glasate": "Croquembouche with candied chestnuts",
  "Șampanie și vinuri selecționate": "Champagne and selected wines",
  "Notă de final": "Closing note", "Subtitlu": "Subtitle", "Ilustrație": "Illustration", "Titlu moment": "Moment title",
  "Denumire fel": "Course name", "Preparat": "Dish", "Mențiune": "Note",
  "Ex: Pentru început, Fel principal": "E.g. To begin, Main course", "Linia mică, cursivă. Ex: varianta vegetariană": "The small italic line. E.g. the vegetarian option",
  "Ex: locația și ora cinei": "E.g. the venue and the time of dinner",
  "Cronologia evenimentelor, afișată cu ilustrații în invitație.": "The timeline of events, shown with illustrations in the invitation.",
  "Felurile de mâncare, afișate într-un cadru ornamental.": "The courses, shown in an ornamental frame.",
  "+ Adaugă moment": "+ Add a moment", "+ Adaugă fel de mâncare": "+ Add a course",
  // Collection browser
  "Ne căsătorim": "We're getting married", "Alege invitația": "Choose this invitation",
  "Luminoase": "Light", "Întunecate": "Dark", "Romantice": "Romantic", "modele": "designs",
  "Modelele recomandate": "Recommended designs",
  "Filtrează modelele": "Filter the designs", "Modelele din colecție": "Designs in the collection",
  "Paleta de culori a modelului": "The design's colour palette", "Vezi demo →": "View demo →",
  "Program, hartă, RSVP": "Schedule, map, RSVP", "Program ilustrat, meniu": "Illustrated schedule, menu",
  "Plic cu sigiliu, dress code": "Wax-seal envelope, dress code",
  // Burgundy Seal model
  "Atinge sigiliul pentru a deschide": "Tap the seal to open", "Deschide invitația": "Open the invitation",
  "Dress code": "Dress code", "Locație": "Location", "Detalii eveniment": "Event details",
  "Duminică": "Sunday", "Luni": "Monday", "Marți": "Tuesday", "Miercuri": "Wednesday", "Joi": "Thursday", "Vineri": "Friday", "Sâmbătă": "Saturday",
  "Ianuarie": "January", "Februarie": "February", "Martie": "March", "Aprilie": "April", "Mai": "May", "Iunie": "June", "Iulie": "July",
  "Septembrie": "September", "Octombrie": "October", "Noiembrie": "November", "Decembrie": "December",
  "la": "at", "Cina și toasturi": "Dinner & toasts", "Să petrecem!": "Let's party!", "Artificii și rămas bun": "Sparklers send-off",
  "Paleta de culori recomandată invitaților.": "The colour palette suggested to guests.",
  "Mențiune dress code": "Dress code note", "Opțional. Ex: ținută de seară": "Optional. E.g. evening attire",
  "Hotelul recomandat invitaților.": "The hotel recommended to guests.", "Denumire hotel": "Hotel name",
  "Poza de mulțumire": "Thank-you photo", "Apare la finalul invitației, în alb-negru.": "Shown at the end of the invitation, in black and white.",
  "Plicul de deschidere": "Opening envelope", "Arată plicul cu sigiliu la deschiderea invitației": "Show the wax-seal envelope when the invitation opens",
  "Ceremonie": "Ceremony", "Verighete": "Rings", "Cocktail": "Cocktail", "Cină": "Dinner", "Dans": "Dance", "Tort": "Cake", "Toast": "Toast", "Ceas": "Clock",
};

const PATTERNS: [RegExp, (...m: string[]) => string][] = [
  [/^(\d+) lei$/, (_, n) => `${n} RON`],
  [/^Vezi toate cele (\d+) (?:de )?modele$/, (_, n) => `View all ${n} designs`],
  [/^Masa (\d+)$/, (_, n) => `Table ${n}`],
  [/^Masa (\d+) — (\d+)\/(\d+)$/, (_, n, a, b) => `Table ${n} — ${a}/${b}`],
  [/^(\d+) locuri libere$/, (_, n) => `${n} free seats`],
  [/^(\d+) loc liber$/, (_, n) => `${n} free seat`],
  [/^(\d+) persoane · (.+)$/, (_, n, r) => `${n} guests · ${translate(r) ?? r}`],
  [/^(\d+) persoane$/, (_, n) => `${n} guests`],
  [/^(\d+) invitați$/, (_, n) => `${n} guests`],
  [/^(\d+) zile rămase$/, (_, n) => `${n} days left`],
  [/^Invitațiile mele · (.+) · (\d+ \S+ \d{4})$/, (_, n, d) => `My invitations · ${n} · ${translate(d) ?? d}`],
  [/^"(.+)"$/, (_, q) => { const t = translate(q); return t ? `"${t}"` : `"${q}"`; }],
  [/^Bine ai venit, (.+)$/, (_, n) => `Welcome, ${n}`],
  [/^Cu drag, (.+)$/, (_, n) => `With love, ${n}`],
  [/^(\d+) (Ianuarie|Februarie|Martie|Aprilie|Mai|Iunie|Iulie|August|Septembrie|Octombrie|Noiembrie|Decembrie) (\d{4})$/i,
    (_, d, m, y) => `${MONTHS[m.toLowerCase()]} ${d}, ${y}`],
  [/^Te rugăm să confirmi până la (.+)$/, (_, d) => {
    const clean = d.replace(/\.$/, "");
    return `Please RSVP by ${translate(clean) ?? clean}.`;
  }],
  [/^Invitația (.+)$/, (_, n) => `The ${n} invitation`],
  [/^Vezi demo-ul (.+)$/, (_, n) => `View the ${n} demo`],
];
const MONTHS: Record<string, string> = { ianuarie: "January", februarie: "February", martie: "March", aprilie: "April", mai: "May", iunie: "June", iulie: "July", august: "August", septembrie: "September", octombrie: "October", noiembrie: "November", decembrie: "December" };

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const DICT_N = new Map(Object.entries(DICT).map(([k, v]) => [norm(k), v]));

export function translate(s: string): string | undefined {
  const k = norm(s);
  if (!k) return undefined;
  const hit = DICT_N.get(k);
  if (hit) return hit;
  for (const [re, fn] of PATTERNS) {
    const m = k.match(re);
    if (m) return fn(...m);
  }
  return undefined;
}

const ATTRS = ["placeholder", "aria-label", "title", "alt"];
const origText = new WeakMap<Text, string>();
const origAttr = new WeakMap<Element, Record<string, string>>();
const touchedText = new Set<Text>();
const touchedEls = new Set<Element>();
let observer: MutationObserver | null = null;
let current: Lang = "ro";

function doText(node: Text) {
  const p = node.parentElement;
  if (!p || p.closest("script,style,textarea,[data-no-translate]")) return;
  const val = node.nodeValue ?? "";
  const known = origText.get(node);
  // If React changed the node since we translated, treat new value as source.
  const source = known !== undefined && val === translatedOf(known, val) ? known : val;
  const tr = translate(source);
  if (!tr) return;
  origText.set(node, source);
  touchedText.add(node);
  const lead = source.match(/^\s*/)?.[0] ?? "";
  const trail = source.match(/\s*$/)?.[0] ?? "";
  const next = lead + tr + trail;
  if (val !== next) node.nodeValue = next;
}
function translatedOf(src: string, val: string) {
  const tr = translate(src);
  if (!tr) return undefined;
  return (src.match(/^\s*/)?.[0] ?? "") + tr + (src.match(/\s*$/)?.[0] ?? "") === val ? val : undefined;
}

function doEl(el: Element) {
  if (el.closest("[data-no-translate]")) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (!v) continue;
    const saved = origAttr.get(el) ?? {};
    const source = saved[a] !== undefined && translate(saved[a]) === v ? saved[a] : v;
    const tr = translate(source);
    if (!tr) continue;
    saved[a] = source;
    origAttr.set(el, saved);
    touchedEls.add(el);
    if (v !== tr) el.setAttribute(a, tr);
  }
}

function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return doText(root as Text);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  doEl(root as Element);
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n: Node | null;
  while ((n = tw.nextNode())) {
    if (n.nodeType === Node.TEXT_NODE) doText(n as Text);
    else doEl(n as Element);
  }
}

function restore() {
  touchedText.forEach((t) => { const o = origText.get(t); if (o !== undefined && t.isConnected) t.nodeValue = o; });
  touchedEls.forEach((el) => { const o = origAttr.get(el); if (o) for (const a in o) el.setAttribute(a, o[a]); });
  touchedText.clear(); touchedEls.clear();
}

export function applyLanguage(lang: Lang) {
  if (typeof document === "undefined") return;
  current = lang;
  document.documentElement.lang = lang;
  observer?.disconnect();
  observer = null;
  if (lang === "ro") { restore(); return; }
  walk(document.body);
  if (document.title) { const t = translate(document.title); if (t) document.title = t; }
  observer = new MutationObserver((muts) => {
    if (current !== "en") return;
    for (const m of muts) {
      if (m.type === "characterData") doText(m.target as Text);
      else if (m.type === "attributes") doEl(m.target as Element);
      else m.addedNodes.forEach(walk);
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}

export function getStoredLang(): Lang {
  if (typeof localStorage === "undefined") return "ro";
  return localStorage.getItem(LANG_KEY) === "en" ? "en" : "ro";
}
export function setLanguage(lang: Lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLanguage(lang);
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
}
