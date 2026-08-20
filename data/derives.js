/* ============================================================
   derives.js — SOURCE UNIQUE des 46 dérives
   ------------------------------------------------------------
   Ce fichier est le seul endroit où les fiches existent.
   Toute page qui les affiche le charge avant son propre script :
       balise script src="data/derives.js", avant le script de la page
   Il expose deux constantes globales : PREUVE et ARBRE.
   Ne pas dupliquer ce contenu dans une page.
   Extrait de oeil-outil.html le 20 août 2026.
   ============================================================ */

const PREUVE = {
  science:["science","Recherche établie"],
  clinique:["clinique","Éthologie clinique"],
  terrain:["terrain","Savoir de métier"],
  securite:["securite","Principe de sécurité"],
  reserve:["reserve","Module non construit"]
};

const ARBRE = {

depart:{q:"Où le problème se manifeste-t-il d'abord ?",o:[
  {l:"Au travail, sur les animaux",v:"trav"},
  {l:"Au quotidien : maison, promenade, rencontres",v:"quot"},
  {l:"En séance d'éducation, hors animaux",v:"edu"},
  {l:"Sur un autre travail : chasse, pistage, sport",v:"autre"}]},

/* ---------- TRAVAIL ---------- */
trav:{q:"Comment cela se manifeste-t-il au travail ?",o:[
  {l:"Il court trop, il s'emballe, il disperse",v:"trav_course"},
  {l:"Il pince ou il mord les animaux",v:"trav_saisie"},
  {l:"Il se bloque, il n'avance plus",v:"trav_bloc"},
  {l:"Il se désintéresse ou il quitte la séance",v:"trav_quitte"},
  {l:"Il n'obéit plus à des ordres qu'il connaît",v:"trav_sourd"},
  {l:"Il aboie sans arrêt pendant le travail",v:"d_aboi"},
  {l:"Ses trajets sont mauvais : il coupe, il sort mal",v:"trav_traj"}]},

trav_course:{q:"S'arrête-t-il quand vous le lui demandez pendant l'action ?",o:[
  {l:"Jamais, ou presque jamais",v:"d_course_folle"},
  {l:"Oui mais avec retard et à contrecœur",v:"d_course_recup"},
  {l:"Bien en début de séance, puis ça se dégrade",v:"d_saturation"}]},

trav_saisie:{q:"Dans quelle situation la saisie apparaît-elle ?",o:[
  {l:"Quand il est très excité, en pleine course",v:"d_saisie_desinhib"},
  {l:"Quand un animal lui fait face ou le charge",v:"d_grip_defensif"},
  {l:"Quand un animal refuse d'avancer",v:"d_grip_forcage"},
  {l:"Sans motif visible, y compris au calme",v:"d_saisie_grave"}]},

trav_bloc:{q:"À quoi ressemble le blocage ?",o:[
  {l:"Il fixe intensément et ne repart plus",v:"d_oeil_colle"},
  {l:"Il se couche et refuse de se relever",v:"d_refus_relever"},
  {l:"Il s'arrête loin et n'ose pas approcher",v:"d_peur_pression"},
  {l:"Il tourne autour sans jamais s'engager",v:"d_indecision"}]},

trav_quitte:{q:"Que fait-il exactement quand il décroche ?",o:[
  {l:"Il renifle le sol, se secoue, bâille, s'éloigne un peu",v:"d_apaisement"},
  {l:"Il part complètement, revient vers vous ou au véhicule",v:"d_demission"},
  {l:"Il se met à faire autre chose : creuser, jouer, marquer",v:"d_derivation"}]},

trav_sourd:{q:"Dans quel état est-il à ce moment-là ?",o:[
  {l:"Très excité, haletant, les yeux fixes",v:"d_surchauffe"},
  {l:"Calme mais il fait semblant de ne pas entendre",v:"d_ordre_use"},
  {l:"Il obéit ailleurs mais pas près des animaux",v:"d_generalisation"}]},

trav_traj:{q:"Quel est le défaut de trajet le plus net ?",o:[
  {l:"Il coupe par le milieu au lieu de contourner",v:"d_coupe"},
  {l:"Il part bien mais s'arrête à mi-parcours",v:"d_sortie_courte"},
  {l:"Il arrive trop près et bouscule les animaux",v:"d_pression_finale"},
  {l:"Il ne sait aller que d'un seul côté",v:"d_flanc_unique"}]},

/* ---------- QUOTIDIEN ---------- */
quot:{q:"Quel est le problème au quotidien ?",o:[
  {l:"Il ne se pose jamais, il est toujours en mouvement",v:"quot_agite"},
  {l:"Il réagit fort à des choses précises",v:"quot_reactif"},
  {l:"Il a peur, il se cache, il fuit",v:"quot_peur"},
  {l:"Il fait des choses répétitives et bizarres",v:"quot_repet"},
  {l:"Il est difficile quand on le laisse seul",v:"d_separation"},
  {l:"Il grogne quand on approche de sa gamelle ou d'un objet",v:"d_gardiennage"}]},

quot_agite:{q:"Se calme-t-il après une grosse dépense physique ?",o:[
  {l:"Non, et il en redemande toujours plus",v:"d_hyperactif"},
  {l:"Oui, mais ça ne dure pas",v:"d_besoin_mental"},
  {l:"Il ne dort pas ou très peu",v:"d_sommeil"}]},

quot_reactif:{q:"Il réagit surtout à quoi ?",o:[
  {l:"Aux autres chiens",v:"d_reactif_chiens"},
  {l:"À tout ce qui bouge : vélos, voitures, joggeurs, enfants",v:"d_poursuite_deviee"},
  {l:"Aux visiteurs, aux inconnus qui entrent",v:"d_inconnus"},
  {l:"Aux bruits : coups de feu, orage, moteurs",v:"d_bruits"}]},

quot_peur:{q:"Depuis quand cette peur existe-t-elle ?",o:[
  {l:"Depuis toujours, ou depuis très jeune",v:"d_privation"},
  {l:"Elle est apparue après un événement précis",v:"d_peur_acquise"},
  {l:"Elle est apparue progressivement chez un adulte",v:"d_peur_tardive"}]},

quot_repet:{q:"Que fait-il précisément ?",o:[
  {l:"Il poursuit les ombres, les reflets, la lumière",v:"d_ombres"},
  {l:"Il tourne sur lui-même, se mord la queue, se lèche trop",v:"d_stereotypie"},
  {l:"Il fixe un point ou un objet sans fin",v:"d_fixation_objet"}]},

/* ---------- ÉDUCATION ---------- */
edu:{q:"Qu'est-ce qui coince en séance ?",o:[
  {l:"Il apprend très lentement",v:"edu_lent"},
  {l:"Il connaît l'ordre mais ne le fait pas partout",v:"d_generalisation"},
  {l:"Il se démoralise, se couche, se fige",v:"d_shutdown"},
  {l:"Il est trop excité pour apprendre quoi que ce soit",v:"d_surchauffe_seance"},
  {l:"Il savait le faire et il ne le fait plus",v:"d_regression"}]},

edu_lent:{q:"Comment travaillez-vous actuellement ?",o:[
  {l:"Séances longues, on répète beaucoup",v:"d_seance_longue"},
  {l:"Séances courtes mais les progrès sont minces",v:"d_criteres"},
  {l:"Le chien ne semble pas comprendre ce qu'on attend",v:"d_criteres"}]},

/* ---------- AUTRES DISCIPLINES ---------- */
autre:{q:"Dans quel domaine ?",o:[
  {l:"Chasse — chien d'arrêt",v:"d_arret_derive"},
  {l:"Chasse — rapport et gueule dure",v:"d_gueule_dure"},
  {l:"Travail du nez — pistage, recherche, détection",v:"d_nez_derive"},
  {l:"Sport ou discipline encadrée",v:"d_sport_derive"}]},

/* ============ ISSUES ============ */

d_course_folle:{fin:true,niv:"science",grave:true,titre:"Poursuite incontrôlée — le chien n'est plus joignable",
  nature:"Dérive de la poursuite",
  quoi:"Une fois lancé, votre chien n'entend plus rien. Ce n'est pas de l'entêtement : la poursuite est la partie la plus exagérée de sa séquence de chasse, et elle se récompense toute seule. Chaque course réussie rend la suivante plus probable et plus difficile à interrompre, même si vous n'avez rien donné au chien. C'est pour cette raison qu'attendre que « ça se calme avec l'âge » ne fonctionne pas : le comportement s'entraîne à chaque répétition.",
  cible:"Reprendre la main sur le déclencheur avant qu'il ne s'enclenche, plutôt que d'essayer d'arrêter une course déjà lancée.",
  exos:[
    {ou:"Hors animaux",t:"L'arrêt en mouvement",p:"Le chien trotte vers vous, vous demandez l'arrêt, il se couche net. Puis en marchant à côté. Puis en courant. Puis avec une balle qui roule. Le geste doit être solide sans brebis avant d'exister avec."},
    {ou:"Au quotidien",t:"Zéro course libre entre les séances",p:"Pas de poursuite de vélos, de balles lancées à répétition, de jeux de course sans règles. Vous ne pouvez pas éteindre au troupeau ce que vous entretenez ailleurs."},
    {ou:"Sur animaux",t:"Longe, petit lot, espace fermé, encadrant",p:"On ne remet pas un chien qui ne s'arrête pas dans une situation où il peut courir. Le retour au troupeau se fait attaché, avec peu d'animaux calmes, et quelqu'un d'expérimenté à côté."}],
  piege:"Crier plus fort et courir après lui. Vous devenez alors un élément du jeu, et la scène entière — brebis qui fuient, humain qui court — devient encore plus excitante que la course seule.",
  src:"Donaldson — renforcement · Jones · Scrimgeour"},

d_course_recup:{fin:true,niv:"science",titre:"Poursuite récupérable — le contrôle existe, il est juste trop lent",
  nature:"Dérive de la poursuite",
  quoi:"Il revient, mais avec un délai et de la résistance. Autrement dit, l'ordre fonctionne mais il est en concurrence directe avec une activité bien plus gratifiante. Chaque seconde de délai est une seconde de poursuite en plus, donc une répétition de plus du comportement que vous voulez réduire.",
  cible:"Réduire le délai à zéro, en travaillant à un niveau d'excitation où le chien peut encore réussir.",
  exos:[
    {ou:"Hors animaux",t:"Baisser la difficulté jusqu'à la réussite",p:"S'il obéit en trois secondes à dix mètres et jamais à trente, travaillez à dix mètres. Un exercice réussi vingt fois vaut mieux qu'un exercice raté trois fois."},
    {ou:"Au quotidien",t:"L'arrêt paie, toujours",p:"Un arrêt obtenu doit être suivi de quelque chose qui compte pour ce chien-là. Pour un chien de conduite, la meilleure récompense est souvent l'autorisation de repartir travailler."},
    {ou:"Sur animaux",t:"Arrêter la séance sur une réussite",p:"On stoppe pendant que ça va bien, pas après l'erreur. Une séance qui se termine sur un bon arrêt vaut mieux qu'une séance longue qui finit mal."}],
  piege:"Répéter l'ordre trois fois. Le chien apprend alors que le premier n'engage à rien, et vous fabriquez vous-même le délai que vous cherchez à supprimer.",
  src:"Donaldson · Scrimgeour"},

d_saturation:{fin:true,niv:"terrain",titre:"Saturation — ça se dégrade au fil de la séance",
  nature:"Fatigue et excitation cumulées",
  quoi:"Le début va bien, la fin est mauvaise. Ce n'est pas de la mauvaise volonté : l'excitation s'accumule au fil de la séance et le chien perd progressivement sa capacité à écouter. La performance ne décroît pas parce qu'il se lasse, mais parce qu'il monte.",
  cible:"Terminer avant le point de bascule, pas après.",
  exos:[
    {ou:"Hors animaux",t:"Repérer le signe précurseur",p:"Notez ce qui change juste avant la dégradation : halètement, queue plus haute, oreilles fixes, réponses plus lentes. C'est votre signal d'arrêt, et il arrive toujours plus tôt qu'on ne croit."},
    {ou:"Au quotidien",t:"Un vrai temps de récupération",p:"Après une séance, du calme réel — pas un jeu, pas une balade excitante. Le retour au niveau de base prend plus longtemps qu'on ne l'imagine."},
    {ou:"Sur animaux",t:"Trois séances de cinq minutes plutôt qu'une de vingt",p:"Le fractionnement conserve la qualité. Une séance longue entraîne surtout la version dégradée du comportement."}],
  piege:"Vouloir « finir sur quelque chose de bien » quand le chien est déjà saturé. On prolonge alors une séance qui ne peut plus rien produire de bon.",
  src:"Scrimgeour · Holland"},

d_saisie_desinhib:{fin:true,niv:"clinique",grave:true,titre:"Saisie dans l'excitation — arrêt immédiat du travail libre",
  nature:"Réapparition d'un geste éteint",
  quoi:"Chez un chien de conduite type border collie, la saisie a été éteinte par la sélection. Quand elle réapparaît au sommet de l'excitation, cela signifie que le chien est monté au-delà du niveau où sa retenue fonctionne encore. Ce n'est pas de la désobéissance et cela ne se corrige pas par une punition — mais cela met en jeu la sécurité des animaux, donc cela s'arrête tout de suite.",
  cible:"Empêcher toute nouvelle répétition, puis faire examiner le chien avant de reprendre.",
  exos:[
    {ou:"Priorité",t:"Plus de contact libre",p:"Longe ou pas de troupeau du tout, le temps de comprendre. Chaque répétition consolide le geste."},
    {ou:"Étape obligatoire",t:"Vétérinaire comportementaliste",p:"Une douleur, un trouble, une modification récente de l'état du chien doivent être écartés avant toute lecture en termes de dressage."},
    {ou:"Ensuite",t:"Reprise encadrée, sous le seuil",p:"Le travail reprend à un niveau d'excitation où le chien reste capable de se retenir, avec quelqu'un qui voit la séance."}],
  piege:"Punir sévèrement sur le moment. Cela ajoute de la tension à une situation déjà trop chargée, et fabrique parfois exactement le contraire : une saisie plus rapide et plus discrète.",
  src:"Coppinger — inhibition sélective · Dehasse"},

d_grip_defensif:{fin:true,niv:"terrain",titre:"Pincement défensif — le chien se protège",
  nature:"Réponse de défense, pas de prédation",
  quoi:"Une brebis qui fait face, une mère qui charge pour protéger son agneau, un bélier qui ne cède pas : le chien pince parce qu'il est sous pression et n'a pas d'autre issue. C'est un comportement différent de la saisie d'excitation, et la confusion entre les deux fait faire beaucoup d'erreurs. Ici le problème n'est pas le chien, c'est la situation dans laquelle on l'a mis.",
  cible:"Retirer la pression plutôt que corriger le chien, et lui redonner une porte de sortie.",
  exos:[
    {ou:"Immédiat",t:"Changer les animaux",p:"Des brebis habituées aux chiens, sans agneaux, sans bélier. Un lot difficile fabrique des pincements chez un chien qui n'en fait jamais autrement."},
    {ou:"Hors animaux",t:"Apprendre à se retirer",p:"Un ordre clair pour reculer ou s'écarter donne au chien une réponse acceptable quand la pression monte. Sans cette issue, il ne lui reste que la gueule."},
    {ou:"Sur animaux",t:"Augmenter la distance de travail",p:"Beaucoup de pincements défensifs disparaissent quand le chien travaille de plus loin et n'a plus besoin de trancher un face-à-face."}],
  piege:"Corriger le chien pour un geste qu'il a fait par nécessité. Vous obtenez alors un chien qui ne pince plus mais qui n'ose plus tenir la pression du tout, ce qui est bien plus difficile à réparer.",
  src:"McConnell — lecture de la posture · savoir de terrain"},

d_grip_forcage:{fin:true,niv:"terrain",titre:"Pincement de forçage — le chien pousse un animal qui ne bouge pas",
  nature:"Geste de métier chez certaines races, dérive chez d'autres",
  quoi:"Face à un animal qui refuse d'avancer, le chien pince pour le faire céder. Ce geste est normal et attendu chez les bergers à la culotte, où il fait partie du métier — un pincement léger du jarret. Chez un rassembleur type border collie, où la saisie a été éteinte, sa présence signale plutôt que le chien n'a pas d'autre outil pour gérer un refus.",
  cible:"Donner au chien un moyen de faire avancer un animal sans le toucher.",
  exos:[
    {ou:"Sur animaux",t:"Travailler la pression par la distance",p:"Un pas en avant, une pause, un pas en avant. Un animal cède le plus souvent à la présence maintenue avant de céder au contact."},
    {ou:"Hors animaux",t:"L'avance au pas, à la demande",p:"Le chien apprend à avancer lentement et à s'arrêter net sur ordre. C'est ce contrôle fin qui remplace le pincement."},
    {ou:"Cadre",t:"Vérifier ce qu'on attend de la race",p:"Un berger des Pyrénées qui pince légèrement fait son travail. Un border collie qui pince a un problème. Le même geste ne se lit pas de la même façon selon le chien."}],
  piege:"Appliquer à toutes les races la règle « aucune gueule sur les animaux ». Chez les chiens à la culotte, supprimer complètement le pincement supprime aussi leur capacité à travailler.",
  src:"RACP · associations d'utilisateurs · Coppinger"},

d_saisie_grave:{fin:true,niv:"clinique",grave:true,titre:"Saisie sans déclencheur visible — sortir du cadre du dressage",
  nature:"Signal clinique",
  quoi:"Une saisie qui survient au calme, sans excitation ni pression, ne se lit pas comme une dérive de travail. Ce genre de comportement peut avoir une cause médicale ou relever d'un trouble du comportement, et aucun exercice ne doit être tenté avant d'avoir écarté ces possibilités.",
  cible:"Obtenir un avis vétérinaire avant toute autre démarche.",
  exos:[
    {ou:"Immédiat",t:"Aucun contact avec les animaux",p:"Ni travail, ni approche libre, ni essai « pour voir ». La sécurité passe avant tout le reste."},
    {ou:"Immédiat",t:"Vétérinaire comportementaliste",p:"Douleur, trouble neurologique, trouble du comportement : ce sont des hypothèses médicales et elles se traitent médicalement."},
    {ou:"Après",t:"Reprise seulement si un professionnel le valide",p:"Cet outil ne peut ni évaluer ni accompagner cette situation, et ne prétendra pas le contraire."}],
  piege:"Chercher une explication dans le dressage. Quand un comportement n'a pas de déclencheur, la question n'est plus « comment le corriger » mais « d'où vient-il ».",
  src:"Dehasse — médecine du comportement"},

d_oeil_colle:{fin:true,niv:"science",titre:"Œil collé — le chien fixe et ne repart plus",
  nature:"Excès d'un geste exagéré",
  quoi:"Le regard fixe est la signature du border collie, et il se récompense tout seul : le chien n'a besoin de rien d'autre pour continuer. Quand il devient trop fort, le chien s'installe dedans et perd le mouvement. Il est important de comprendre que ce n'est pas un défaut d'obéissance mais un excès de ce qu'on a sélectionné.",
  cible:"Remettre du mouvement sans abîmer le regard.",
  exos:[
    {ou:"Sur animaux",t:"Changer l'angle plutôt que forcer",p:"Un chien collé se relance souvent mieux par un déplacement latéral que par un ordre d'avancer répété. Il faut casser la fixation, pas la combattre de face."},
    {ou:"Sur animaux",t:"Des animaux qui bougent",p:"Le regard s'installe surtout sur des animaux immobiles. Un lot qui se déplace donne au chien quelque chose à suivre."},
    {ou:"Hors animaux",t:"Travailler le déclenchement du mouvement",p:"Un ordre clair d'avancer, appris au calme et sans troupeau, donne un point d'appui quand le chien est bloqué."}],
  piege:"Sanctionner le blocage. Vous punissez alors précisément la qualité que vous cherchez à obtenir, et vous risquez un chien qui n'ose plus fixer du tout.",
  src:"Coppinger & Schneider · Jones · Scrimgeour"},

d_refus_relever:{fin:true,niv:"clinique",titre:"Refus de se relever — vérifier le corps avant le comportement",
  nature:"À écarter médicalement d'abord",
  quoi:"Un chien qui se couche et refuse de repartir peut être bloqué par l'excès de regard, mais il peut aussi avoir mal, être épuisé, ou avoir trop chaud. L'ordre des vérifications compte : on regarde le corps avant d'interpréter le comportement, car un chien qui a mal fait souvent exactement la même chose qu'un chien qui bloque.",
  cible:"Éliminer les causes physiques, puis lire le comportement.",
  exos:[
    {ou:"D'abord",t:"Chaleur, sol, fatigue, douleur",p:"Températures, durée de travail, état des coussinets, boiterie discrète, âge du chien. Une consultation s'impose si le doute persiste."},
    {ou:"Ensuite",t:"Séances très courtes",p:"Si le corps va bien, on reconstruit sur des durées où le chien n'a pas le temps d'atteindre le point de blocage."},
    {ou:"Ensuite",t:"Relance par le mouvement",p:"Comme pour l'œil collé : changer d'angle, faire bouger les animaux, éviter le face-à-face avec un chien figé."}],
  piege:"Insister verbalement sur un chien qui ne peut pas se relever. Si la cause est physique, on aggrave ; si elle est comportementale, on ajoute de la pression à une situation déjà bloquée.",
  src:"Dehasse · savoir de terrain"},

d_peur_pression:{fin:true,niv:"terrain",titre:"Le chien n'ose pas approcher",
  nature:"Évitement sous pression",
  quoi:"Le chien s'arrête à distance et n'engage pas. Souvent parce que les animaux sont trop nombreux, trop lourds ou trop réactifs pour lui, parfois parce qu'une mauvaise expérience est passée par là. Un chien qui n'ose pas n'est pas un chien sans instinct : c'est un chien qu'on a mis face à plus fort que lui.",
  cible:"Reconstruire de la confiance avec un lot que le chien peut réellement déplacer.",
  exos:[
    {ou:"Sur animaux",t:"Trois ou quatre brebis, pas trente",p:"Un petit lot calme et habitué aux chiens redonne au chien l'expérience de réussir. C'est la base de toute reconstruction."},
    {ou:"Sur animaux",t:"Espace fermé et petit",p:"Un grand parc laisse les animaux fuir et le chien perdre le contrôle. Un espace restreint rend la situation lisible."},
    {ou:"Hors animaux",t:"Ne pas ajouter de pression humaine",p:"Un chien déjà sous pression a besoin d'un conducteur calme et immobile, pas d'encouragements pressants. Notre agitation se lit comme une menace supplémentaire."}],
  piege:"Augmenter la difficulté pour « le forcer à se lancer ». On obtient au mieux un chien qui subit, au pire un chien qui refuse durablement le troupeau.",
  src:"McConnell · Jones"},

d_indecision:{fin:true,niv:"science",titre:"Il tourne autour sans s'engager",
  nature:"Séquence incomplète ou immature",
  quoi:"Le chien s'intéresse, il se déplace, mais rien ne se déclenche vraiment. C'est très fréquent chez un jeune dont les gestes n'ont pas encore fini d'apparaître. Coppinger et Schneider sont clairs là-dessus : l'apparition des patrons varie fortement d'un individu à l'autre, et le dressage ne peut pas commencer avant.",
  cible:"Attendre sans forcer, tout en travaillant ce qui se travaille.",
  exos:[
    {ou:"Sur animaux",t:"Exposition courte et sans enjeu",p:"Quelques minutes, sans rien demander, puis on sort. On laisse la séquence mûrir plutôt que de la provoquer."},
    {ou:"Hors animaux",t:"Tout le reste",p:"Rappel, arrêt, marche, calme, confiance. Ce sont ces acquis qui rendront le vrai début de travail beaucoup plus simple."},
    {ou:"Repère",t:"Observer plutôt que juger",p:"Notez quand apparaissent le premier vrai regard fixe, le premier corps qui se baisse. Ces dates valent mieux que n'importe quelle impression générale."}],
  piege:"Conclure que le chien « n'a rien dans le sang » à dix mois. Certains démarrent à huit mois, d'autres à deux ans, et le second groupe ne fait pas de moins bons chiens.",
  src:"Coppinger & Schneider"},

d_apaisement:{fin:true,niv:"clinique",titre:"Il se secoue, bâille, renifle — il vous dit qu'il sature",
  nature:"Signaux de désamorçage",
  quoi:"Renifler le sol sans raison, bâiller, se lécher le nez, se secouer, détourner la tête, ralentir : ces comportements sont décrits comme des signaux par lesquels le chien désamorce une tension. C'est une grille de lecture très répandue et utile sur le terrain, mais il faut le dire honnêtement : elle repose sur l'observation de praticiens plus que sur un corpus expérimental validé. Prise pour ce qu'elle est, elle rend un vrai service — elle vous dit d'arrêter avant que ça n'aille plus mal.",
  cible:"Réduire la pression maintenant, plutôt que d'attendre le décrochage complet.",
  exos:[
    {ou:"En séance",t:"S'arrêter au premier signal",p:"Pause, distance, respiration. Un chien qui donne ces signaux ne progressera plus dans les minutes qui suivent."},
    {ou:"En séance",t:"Regarder ce que vous faites",p:"Ton de voix, gestes des bras, position du corps, proximité. La pression vient très souvent du conducteur sans qu'il s'en rende compte."},
    {ou:"Sur la durée",t:"Séances plus courtes que ce que vous croyez nécessaire",p:"Le meilleur repère reste la fin de séance sur une réussite, avant que ces signaux n'apparaissent."}],
  piege:"Interpréter le reniflage comme de la distraction et hausser le ton. Vous ajoutez alors de la pression au moment précis où le chien vous demandait d'en enlever.",
  src:"Rugaas — observation de terrain · McConnell"},

d_demission:{fin:true,niv:"terrain",titre:"Il quitte complètement la séance",
  nature:"Décrochage installé",
  quoi:"Le chien part, revient vers vous ou vers le véhicule, et ne veut plus travailler. C'est en général l'étape d'après les signaux d'apaisement : la pression a duré trop longtemps. Un chien qui démissionne a appris que la séance n'apporte rien de bon — et cet apprentissage-là est solide.",
  cible:"Faire redevenir la séance quelque chose de désirable, à un niveau où il peut réussir.",
  exos:[
    {ou:"Réinitialiser",t:"Baisser massivement l'exigence",p:"Trois minutes, un lot facile, une seule chose demandée, et on arrête. Pendant plusieurs séances, l'objectif est uniquement que le chien veuille y retourner."},
    {ou:"En séance",t:"Terminer avant qu'il ne parte",p:"Si le décrochage arrive à la sixième minute, arrêtez à la quatrième. Toujours."},
    {ou:"Hors séance",t:"Vérifier ce qui a changé",p:"Un nouveau lot, une douleur, un événement marquant, un changement chez le conducteur. Une démission a presque toujours une histoire."}],
  piege:"Aller le chercher et le ramener de force au travail. Vous confirmez que la séance est un endroit dont il faut s'échapper.",
  src:"Donaldson · Rugaas · savoir de terrain"},

d_derivation:{fin:true,niv:"science",titre:"Il se met à faire autre chose",
  nature:"Comportement de substitution",
  quoi:"Creuser, jouer, marquer, attraper des herbes en plein travail : quand un chien ne peut ni avancer ni fuir, il fait souvent une troisième chose sans rapport. C'est un signe de conflit interne, pas d'insolence. Des observations anciennes en laboratoire ont montré la même chose chez des border collies placés devant des proies qui ne bougeaient pas : ils se mettaient à faire des courbettes de jeu et à aboyer.",
  cible:"Lever le conflit en rendant la situation lisible pour le chien.",
  exos:[
    {ou:"Sur animaux",t:"Donner du mouvement",p:"La substitution apparaît souvent quand rien ne bouge et que le chien ne sait plus quoi faire. Des animaux qui se déplacent règlent une bonne partie du problème."},
    {ou:"En séance",t:"Une seule demande à la fois",p:"Deux ordres contradictoires, ou une consigne floue, produisent exactement ce genre de comportement."},
    {ou:"En séance",t:"Baisser la difficulté d'un cran",p:"Si la substitution revient au même moment de chaque séance, c'est là qu'il faut simplifier."}],
  piege:"Punir le comportement de substitution. Il disparaît, mais le conflit reste — et il ressort ailleurs, souvent sous une forme moins lisible.",
  src:"Coppinger & Schneider · Rugaas"},

d_surchauffe:{fin:true,niv:"clinique",titre:"Trop excité pour entendre",
  nature:"Excitation au-dessus du seuil d'écoute",
  quoi:"Le chien connaît l'ordre, il ne l'exécute pas, et il est visiblement très excité. Il ne fait pas semblant : au-delà d'un certain niveau d'excitation, la capacité à traiter une consigne s'effondre. Ce qu'on prend pour de la désobéissance est un état, pas un choix.",
  cible:"Travailler sous le seuil, et faire redescendre plutôt que d'insister.",
  exos:[
    {ou:"En séance",t:"Trouver le seuil et rester dessous",p:"Cherchez la distance et le niveau d'activité auxquels le chien répond encore. C'est votre point de départ, même s'il paraît ridiculement facile."},
    {ou:"Hors animaux",t:"Apprendre à redescendre",p:"Des exercices calmes après une phase d'excitation contrôlée : le chien apprend que l'excitation retombe, ce qui n'a rien d'évident pour lui."},
    {ou:"Sur animaux",t:"Séquences très courtes",p:"Une minute d'action, une pause au calme, une minute d'action. Le fractionnement empêche l'accumulation."}],
  piege:"Répéter l'ordre de plus en plus fort. Le chien ne l'entend pas mieux, et vous ajoutez de l'excitation à un chien qui en a déjà trop.",
  src:"Donaldson · McConnell"},

d_ordre_use:{fin:true,niv:"science",titre:"L'ordre ne veut plus rien dire",
  nature:"Consigne vidée de son sens",
  quoi:"Un ordre répété sans conséquence finit par ne plus rien signifier. Si vous dites « couché » cinq fois et que le chien finit par se coucher, ce qu'il a appris, c'est qu'il se couche au cinquième. Si vous le dites et que rien ne suit, il a appris que ce mot n'est pas important.",
  cible:"Redonner de la valeur au mot, en repartant proprement.",
  exos:[
    {ou:"Hors animaux",t:"Un mot, une fois",p:"On demande une seule fois. Si rien ne vient, on ne répète pas : on rend l'exercice plus facile et on recommence."},
    {ou:"Hors animaux",t:"Repartir d'un mot neuf si nécessaire",p:"Quand un ordre est trop abîmé, il est souvent plus rapide d'en apprendre un nouveau que de réparer l'ancien."},
    {ou:"Sur animaux",t:"N'utiliser l'ordre que quand vous pouvez l'obtenir",p:"Un ordre donné dans une situation où le chien ne peut pas réussir l'affaiblit à chaque fois."}],
  piege:"Croire que le chien « fait exprès ». Il applique exactement ce qu'on lui a appris, y compris ce qu'on ne voulait pas lui apprendre.",
  src:"Donaldson"},

d_generalisation:{fin:true,niv:"science",titre:"Il obéit ici mais pas là-bas",
  nature:"Défaut de généralisation",
  quoi:"Le chien exécute parfaitement dans le jardin et plus du tout près des brebis. C'est normal et très courant : les chiens généralisent mal. Pour eux, « couché dans la cuisine » et « couché dans un pré avec trente brebis » ne sont pas la même chose. Il ne s'agit pas de rappeler un acquis, mais de le réapprendre dans chaque nouveau décor.",
  cible:"Réapprendre le même geste dans une dizaine de contextes différents.",
  exos:[
    {ou:"Hors animaux",t:"Changer un seul paramètre à la fois",p:"Même lieu, autre heure. Autre lieu, même exercice. Debout, puis assis, puis en marchant. Un changement par séance."},
    {ou:"Progression",t:"Approcher les animaux par paliers",p:"À cent mètres, puis cinquante, puis vingt. On ne passe au palier suivant que lorsque le précédent est acquis sans hésitation."},
    {ou:"Repère",t:"Compter les décors, pas les répétitions",p:"Dix contextes différents valent bien mieux que cent répétitions au même endroit."}],
  piege:"Conclure qu'il « sait mais ne veut pas ». C'est l'erreur d'interprétation la plus fréquente, et elle mène directement à des corrections injustifiées.",
  src:"Donaldson — apprentissage et contexte"},

d_coupe:{fin:true,niv:"terrain",titre:"Il coupe au lieu de contourner",
  nature:"Trajet trop direct",
  quoi:"Au lieu de partir large et de contourner, le chien va droit sur les animaux. Le résultat est mécanique : le troupeau se disperse au lieu de se regrouper. Le trajet large n'est pas une élégance de concours, c'est ce qui permet aux animaux de rester ensemble.",
  cible:"Élargir le départ, sans transformer cela en bataille d'ordres.",
  exos:[
    {ou:"Sur animaux",t:"Se placer pour ouvrir l'angle",p:"La position du conducteur influence énormément le trajet du chien. Beaucoup de trajets trop directs se corrigent en changeant d'endroit, pas en criant."},
    {ou:"Sur animaux",t:"Raccourcir la distance",p:"Un chien qui coupe sur cent mètres réussit souvent parfaitement sur vingt. On construit large sur court avant d'allonger."},
    {ou:"Cadre",t:"Ce point s'apprend sur le terrain",p:"Les écoles diffèrent sensiblement sur la manière d'obtenir un bon départ. C'est typiquement ce qui se transmet avec quelqu'un qui voit le chien travailler."}],
  piege:"Multiplier les ordres pendant le trajet. Un chien qu'on corrige en permanence pendant sa course finit par ne plus oser partir du tout.",
  src:"Jones · Scrimgeour · Holland"},

d_sortie_courte:{fin:true,niv:"terrain",titre:"Il part bien mais s'arrête en route",
  nature:"Trajet interrompu",
  quoi:"Le départ est correct, puis le chien s'arrête à mi-chemin. Cela peut venir d'un manque de confiance, d'une distance trop grande pour son niveau, ou d'un chien qui ne voit plus les animaux et ne sait plus où aller.",
  cible:"Retrouver une distance où le trajet se termine toujours.",
  exos:[
    {ou:"Sur animaux",t:"Revenir à la distance qui marche",p:"S'il va au bout à trente mètres et s'arrête à cent, on travaille à trente et on allonge de dix en dix."},
    {ou:"Sur animaux",t:"Terrain visible",p:"Un creux, une haie, une pente qui masquent les animaux suffisent souvent à expliquer l'arrêt. Commencez sur un terrain dégagé."},
    {ou:"Hors animaux",t:"Vérifier la forme physique",p:"Un chien qui s'arrête toujours au même endroit peut aussi être limité par sa condition, la chaleur ou une gêne discrète."}],
  piege:"Envoyer plus loin pour « le pousser à progresser ». On installe alors durablement le trajet incomplet.",
  src:"Jones · Holland"},

d_pression_finale:{fin:true,niv:"terrain",titre:"Il arrive trop près et bouscule",
  nature:"Pression excessive en fin de trajet",
  quoi:"Le trajet est bon, mais le chien arrive trop près et met le troupeau en fuite. La distance finale — ce que les praticiens appellent le point où le chien doit s'arrêter derrière les animaux — est un des réglages les plus fins du travail, et le plus dépendant du type d'animaux.",
  cible:"Apprendre au chien à s'arrêter avant le contact.",
  exos:[
    {ou:"Sur animaux",t:"L'arrêt en fin de trajet",p:"L'ordre d'arrêt donné avant l'arrivée, systématiquement, jusqu'à ce que le chien anticipe et s'arrête seul au bon endroit."},
    {ou:"Sur animaux",t:"Adapter aux animaux",p:"Des brebis lourdes acceptent une pression que des animaux légers ne supportent pas. La bonne distance dépend du lot, pas d'une règle fixe."},
    {ou:"En séance",t:"Travailler avec des animaux calmes",p:"Un lot qui fuit entretient la pression. Un lot posé permet au chien d'apprendre à s'arrêter."}],
  piege:"Se concentrer sur la vitesse du chien. Ce n'est pas la vitesse qui pose problème mais la distance d'arrêt, et les deux se règlent séparément.",
  src:"Jones · Scrimgeour"},

d_flanc_unique:{fin:true,niv:"terrain",titre:"Il ne travaille que d'un côté",
  nature:"Asymétrie de travail",
  quoi:"Le chien part volontiers à droite et jamais à gauche, ou l'inverse. C'est très courant. Cela peut venir d'un déséquilibre d'apprentissage — un côté davantage travaillé au départ — mais aussi d'une gêne physique, d'une douleur ou d'un problème de vue d'un côté.",
  cible:"Rééquilibrer les deux côtés, après avoir écarté une cause physique.",
  exos:[
    {ou:"D'abord",t:"Écarter le physique",p:"Une asymétrie nette et durable mérite un examen vétérinaire, en particulier chez un chien qui travaillait des deux côtés auparavant."},
    {ou:"Sur animaux",t:"Travailler surtout le côté faible",p:"Deux départs du côté difficile pour un du côté facile, sur plusieurs séances."},
    {ou:"En séance",t:"Faciliter le côté faible",p:"Distance plus courte, angle plus ouvert, position du conducteur qui aide. On rend le côté difficile facile avant de le rendre normal."}],
  piege:"Insister uniquement du côté difficile jusqu'à l'échec. On associe alors ce côté à une expérience désagréable, ce qui aggrave l'asymétrie.",
  src:"Holland · Scrimgeour"},

d_aboi:{fin:true,niv:"terrain",titre:"Il aboie sans arrêt pendant le travail",
  nature:"À lire différemment selon la race",
  quoi:"Chez un rassembleur silencieux type border collie, un aboiement continu signale le plus souvent de la frustration ou une excitation excessive. Chez un berger à la culotte, en revanche, donner de la voix fait partie du travail : le berger des Pyrénées est réputé pour aboyer, et beaucoup de chiens de ce type utilisent la voix pour déplacer les animaux. La même observation ne se lit donc pas de la même façon.",
  cible:"Distinguer la voix de travail de l'aboiement de frustration, puis agir seulement sur la seconde.",
  exos:[
    {ou:"D'abord",t:"Repérer quand il aboie",p:"S'il aboie quand il ne peut pas agir — retenu, bloqué, empêché — c'est de la frustration. S'il aboie en poussant les animaux, c'est peut-être son métier."},
    {ou:"Si frustration",t:"Réduire l'attente et l'excitation",p:"Moins de temps d'attente, séquences plus courtes, moins de retenue prolongée. La frustration s'entretient surtout dans les temps morts."},
    {ou:"Si voix de travail",t:"Ne pas la supprimer",p:"Chez un chien à la culotte, supprimer la voix revient à lui retirer un de ses outils de travail."}],
  piege:"Vouloir un border collie totalement silencieux ou un berger des Pyrénées totalement muet. On juge alors le chien selon un standard qui n'est pas le sien.",
  src:"Coppinger · associations d'utilisateurs · RACP"},

d_hyperactif:{fin:true,niv:"clinique",titre:"Jamais posé, toujours plus",
  nature:"Excitation chronique",
  quoi:"Un chien qui ne se pose jamais et redemande toujours plus d'activité n'est pas forcément sous-dépensé : il est parfois entraîné à l'excitation permanente. Plus on augmente l'activité physique, plus on entraîne l'endurance et la demande. Il faut aussi savoir que cette agitation permanente peut relever d'une cause médicale — c'est un point sur lequel un avis vétérinaire vaut mieux qu'un raisonnement de bon sens.",
  cible:"Entraîner le calme comme on entraîne un exercice.",
  exos:[
    {ou:"Au quotidien",t:"Des plages de repos imposées",p:"Un espace calme, des temps où il ne se passe rien, un rythme régulier. Le repos s'apprend, il ne vient pas tout seul chez ces chiens."},
    {ou:"Au quotidien",t:"Remplacer une partie de la course par du nez",p:"Le travail olfactif fatigue sans exciter. C'est une des rares activités qui font redescendre au lieu de faire monter."},
    {ou:"Prudence",t:"Consulter si c'est massif",p:"Un chien qui ne dort presque pas, ou qui ne redescend jamais, mérite un examen plutôt qu'un programme d'exercice."}],
  piege:"Augmenter encore la dépense physique. Un chien de travail s'entraîne, et vous obtiendrez surtout un athlète qui a besoin de plus.",
  src:"Dehasse · McConnell"},

d_besoin_mental:{fin:true,niv:"clinique",titre:"Il se calme, mais ça ne dure pas",
  nature:"Dépense physique sans occupation mentale",
  quoi:"La fatigue physique retombe vite. Un chien de conduite est sélectionné pour résoudre des problèmes en mouvement, et un simple lancer de balle répété ne sollicite presque rien de cette capacité. Ce n'est pas une question de quantité mais de nature de l'activité.",
  cible:"Remplacer une partie de la dépense par des activités qui demandent de réfléchir.",
  exos:[
    {ou:"Au quotidien",t:"Chercher plutôt que courir",p:"Objets cachés, pistes courtes dans le jardin, recherche de nourriture dispersée. Quelques minutes de nez valent une longue course."},
    {ou:"Au quotidien",t:"Des exercices qui demandent de choisir",p:"Discriminer deux objets, attendre un signal, s'arrêter en mouvement. La difficulté mentale fatigue mieux que la distance."},
    {ou:"Repère",t:"Observer la qualité du repos",p:"Un chien correctement occupé dort profondément après. Un chien seulement épuisé physiquement s'assoupit puis se relève."}],
  piege:"Le lancer de balle en série. C'est l'activité qui excite le plus pour l'effet le moins durable, et elle entretient exactement la poursuite qu'on cherche à réguler.",
  src:"McConnell · Donaldson"},

d_sommeil:{fin:true,niv:"clinique",titre:"Il ne dort presque pas",
  nature:"Signal à faire examiner",
  quoi:"Un chien qui dort très peu, se réveille sans arrêt ou ne trouve jamais le repos sort du champ de l'éducation. Le sommeil est un indicateur robuste : quand il est franchement perturbé, la question devient médicale.",
  cible:"Faire examiner avant de chercher une solution éducative.",
  exos:[
    {ou:"D'abord",t:"Consultation vétérinaire",p:"Douleur, trouble anxieux, cause organique. Ces hypothèses se vérifient, elles ne se devinent pas."},
    {ou:"En attendant",t:"Un environnement de repos correct",p:"Un endroit calme, sombre, à l'écart du passage, où le chien n'est pas sollicité."},
    {ou:"En attendant",t:"Réduire l'excitation du soir",p:"Pas de jeu intense ni de séance de travail juste avant la nuit."}],
  piege:"Fatiguer davantage le chien pour qu'il dorme. Si la cause est une douleur ou une anxiété, on aggrave la situation.",
  src:"Dehasse"},

d_reactif_chiens:{fin:true,niv:"clinique",titre:"Il réagit fort aux autres chiens",
  nature:"Réactivité sociale",
  quoi:"Aboyer, tirer, se figer, foncer à la vue d'un autre chien. Les causes possibles sont multiples — peur, frustration de ne pas pouvoir aller, mauvaise expérience — et elles ne se traitent pas de la même façon. C'est un domaine où un mauvais diagnostic fait perdre des mois, et où l'accompagnement d'un professionnel change tout.",
  cible:"Retrouver une distance où le chien peut voir un autre chien sans réagir, et repartir de là.",
  exos:[
    {ou:"Au quotidien",t:"Travailler à la distance qui marche",p:"Trouvez la distance à laquelle il remarque l'autre chien sans réagir. C'est là que le travail est possible, et nulle part ailleurs."},
    {ou:"Au quotidien",t:"Éviter les mises en échec",p:"Chaque épisode de réaction forte renforce la réaction. Changer de trottoir n'est pas fuir, c'est éviter une répétition."},
    {ou:"Cadre",t:"Se faire accompagner",p:"Distinguer peur, frustration et autre chose demande de voir le chien. C'est le type de situation où un professionnel fait gagner beaucoup de temps."}],
  piege:"Multiplier les rencontres « pour qu'il s'habitue ». Sans travail sur la distance, on répète surtout la réaction.",
  src:"Dehasse · Donaldson · McConnell"},

d_poursuite_deviee:{fin:true,niv:"science",titre:"Il poursuit tout ce qui bouge",
  nature:"Séquence de chasse détournée",
  quoi:"Vélos, voitures, joggeurs, enfants qui courent : le chien applique à ces cibles la poursuite qui lui a été sélectionnée. C'est le même geste qu'au troupeau, sur un objet qui n'est pas prévu pour. Ce comportement est dangereux et il se renforce tout seul, puisque la cible s'éloigne toujours — le chien a donc l'impression de réussir à chaque fois.",
  cible:"Empêcher les répétitions et donner un exutoire acceptable à la poursuite.",
  exos:[
    {ou:"Immédiat",t:"Gestion avant éducation",p:"Longe, itinéraires calmes, anticipation. Tant que le chien peut poursuivre, aucun apprentissage ne tiendra."},
    {ou:"Au quotidien",t:"Un exutoire cadré",p:"La poursuite ne s'efface pas. Elle se canalise vers une activité autorisée, sous contrôle, avec un début et une fin nets."},
    {ou:"Progression",t:"Travailler l'arrêt loin des déclencheurs",p:"Le geste d'arrêt se construit au calme, puis s'approche progressivement des situations réelles."}],
  piege:"Considérer que c'est « son instinct, on n'y peut rien ». C'est bien son instinct, et c'est précisément pour cela qu'il faut le gérer plutôt que d'espérer qu'il passe.",
  src:"Coppinger · Donaldson"},

d_inconnus:{fin:true,niv:"clinique",titre:"Il réagit aux visiteurs",
  nature:"Réactivité au territoire ou aux inconnus",
  quoi:"Aboiements, tension, parfois grognement à l'arrivée de quelqu'un. Les causes vont de la peur à la surveillance apprise. Comme pour la réactivité aux chiens, c'est une situation qui gagne beaucoup à être vue par quelqu'un plutôt qu'interprétée à distance.",
  cible:"Faire des arrivées un événement prévisible et sans enjeu.",
  exos:[
    {ou:"Au quotidien",t:"Une place attribuée",p:"Un endroit précis où le chien va quand quelqu'un arrive, appris tranquillement sans visiteur avant d'être utilisé avec."},
    {ou:"Au quotidien",t:"Ne pas faire interagir de force",p:"Les visiteurs ignorent le chien. Un chien tendu à qui on tend la main se retrouve coincé entre deux réponses."},
    {ou:"Alerte",t:"Un grognement se respecte",p:"Un grognement est une information précieuse. Le punir supprime l'avertissement sans supprimer le motif."}],
  piege:"Punir le grognement. Vous obtenez un chien qui ne prévient plus, ce qui est bien plus dangereux qu'un chien qui grogne.",
  src:"Dehasse · McConnell"},

d_bruits:{fin:true,niv:"clinique",titre:"Il a peur des bruits",
  nature:"Peur sonore",
  quoi:"Coups de feu, orage, moteurs, feux d'artifice. C'est une peur fréquente qui s'aggrave souvent avec le temps si rien n'est fait, et qui a des conséquences directes en travail comme en chasse. Elle se traite, mais rarement seul et rarement vite.",
  cible:"Ne plus laisser le chien vivre d'épisodes intenses, et faire accompagner le travail de fond.",
  exos:[
    {ou:"Immédiat",t:"Un refuge accessible",p:"Un endroit où le chien peut aller de lui-même, sans être dérangé. Le laisser s'y réfugier n'entretient pas la peur : cela lui donne une réponse."},
    {ou:"Au quotidien",t:"Ne pas exposer brutalement",p:"Emmener un chien qui craint les détonations à une battue pour « qu'il s'habitue » aggrave presque toujours les choses."},
    {ou:"Cadre",t:"Faire accompagner",p:"Les peurs sonores installées relèvent d'un travail progressif encadré, parfois associé à un accompagnement vétérinaire."}],
  piege:"Croire que rassurer un chien qui a peur renforce sa peur. Le réconfort ne renforce pas une émotion — mais paniquer soi-même, oui.",
  src:"Dehasse · Donaldson"},

d_privation:{fin:true,niv:"clinique",titre:"Peur présente depuis toujours",
  nature:"Développement pauvre en expériences",
  quoi:"Un chiot élevé dans un environnement pauvre pendant ses premières semaines peut développer des peurs durables face à tout ce qu'il n'a pas rencontré à ce moment-là : sols, bruits, gens, véhicules. Dehasse a beaucoup décrit ces situations. Le point important est que ce n'est pas un défaut de caractère, et que le travail est long mais réel.",
  cible:"Élargir progressivement le monde connu du chien, sans jamais le mettre en échec.",
  exos:[
    {ou:"Principe",t:"Toujours sous le seuil",p:"Le chien découvre à une distance et une intensité où il reste capable de manger, de bouger, de vous regarder. Au-delà, il n'apprend rien."},
    {ou:"Au quotidien",t:"Une nouveauté à la fois",p:"Un sol nouveau, ou un bruit nouveau, ou un lieu nouveau. Pas les trois ensemble."},
    {ou:"Cadre",t:"Accompagnement recommandé",p:"Ces situations bénéficient énormément d'un suivi, parfois d'un accompagnement vétérinaire en parallèle."}],
  piege:"L'exposition forcée. Mettre le chien au contact de ce qui l'effraie « pour qu'il voie que ce n'est rien » produit des peurs plus profondes.",
  src:"Dehasse — privation sensorielle"},

d_peur_acquise:{fin:true,niv:"science",titre:"Peur apparue après un événement",
  nature:"Association apprise",
  quoi:"Une frayeur, une douleur, une mauvaise rencontre, et le chien associe durablement un lieu, un bruit ou une situation à ce qui s'est passé. Ces associations se font très vite, parfois en une seule fois, et se défont beaucoup plus lentement.",
  cible:"Recréer des expériences neutres ou agréables, très progressivement.",
  exos:[
    {ou:"Principe",t:"Recommencer très loin",p:"Beaucoup plus loin, beaucoup plus faible, beaucoup plus court que ce qui paraît nécessaire."},
    {ou:"Au quotidien",t:"Associer à quelque chose de bon",p:"La situation redoutée annonce systématiquement quelque chose d'agréable, à une intensité où le chien reste capable d'en profiter."},
    {ou:"Attention",t:"Ne pas replonger",p:"Une seule répétition intense peut effacer des semaines de travail."}],
  piege:"Aller trop vite parce que « ça allait mieux la semaine dernière ». Les progrès sur les peurs ne sont pas linéaires.",
  src:"Donaldson · Dehasse"},

d_peur_tardive:{fin:true,niv:"clinique",titre:"Peur apparue tardivement chez un adulte",
  nature:"Signal à faire examiner",
  quoi:"Un chien adulte qui devient progressivement craintif sans événement identifiable est une situation qui mérite un examen. Une douleur qui s'installe, une baisse de vue ou d'audition, un problème général peuvent se manifester d'abord par un changement de comportement.",
  cible:"Écarter une cause médicale avant toute interprétation comportementale.",
  exos:[
    {ou:"D'abord",t:"Bilan vétérinaire",p:"Douleur, vue, audition, état général. Ce sont les premières hypothèses, pas les dernières."},
    {ou:"En attendant",t:"Ne pas insister",p:"Réduire les situations difficiles plutôt que d'essayer de les faire accepter."},
    {ou:"Ensuite",t:"Adapter selon le diagnostic",p:"Un chien qui entend ou voit moins n'a pas besoin de rééducation mais d'adaptations."}],
  piege:"Interpréter un changement tardif comme un caprice ou un effet de l'âge. Chez l'adulte, un changement de comportement est d'abord une donnée médicale.",
  src:"Dehasse"},

d_stereotypie:{fin:true,niv:"clinique",grave:true,titre:"Comportements répétitifs — hors du champ éducatif",
  nature:"Signal clinique",
  quoi:"Tourner sur soi-même, se mordre la queue, se lécher jusqu'à la lésion : ces comportements répétitifs peuvent avoir une origine médicale, être liés à un état de mal-être durable, ou s'être installés comme un automatisme. Ils ne se traitent pas par des exercices trouvés sur une page web.",
  cible:"Consulter, sans passer par une phase d'essais éducatifs.",
  exos:[
    {ou:"Immédiat",t:"Vétérinaire comportementaliste",p:"C'est la première étape, pas la dernière. Certaines de ces situations relèvent directement du soin."},
    {ou:"En attendant",t:"Ne pas punir",p:"La punition d'un comportement répétitif l'aggrave le plus souvent, ou le déplace."},
    {ou:"En attendant",t:"Noter les circonstances",p:"Quand, combien de temps, dans quel contexte. Ces informations sont précieuses pour la consultation."}],
  piege:"Attendre de voir. Ces comportements se consolident avec le temps et deviennent beaucoup plus difficiles à traiter.",
  src:"Dehasse — médecine du comportement"},

d_ombres:{fin:true,niv:"clinique",grave:true,titre:"Poursuite d'ombres et de reflets",
  nature:"Signal clinique",
  quoi:"La poursuite d'ombres, de reflets ou de points lumineux est particulièrement fréquente chez les chiens de conduite. Elle ressemble à un jeu mais s'installe souvent comme un comportement compulsif difficile à interrompre, et elle occupe une place croissante dans la vie du chien.",
  cible:"Consulter tôt, et supprimer immédiatement les déclencheurs.",
  exos:[
    {ou:"Immédiat",t:"Supprimer les sources",p:"Pointeurs lumineux, reflets de montre, lampes torches : plus jamais, y compris pour jouer. Ces jeux sont une cause fréquente d'installation."},
    {ou:"Immédiat",t:"Consultation",p:"Plus le comportement est installé, plus il est difficile à traiter. C'est une situation où l'attente coûte cher."},
    {ou:"En attendant",t:"Occuper autrement",p:"Le travail olfactif est souvent proposé comme activité de remplacement, mais il ne remplace pas la consultation."}],
  piege:"Jouer au pointeur laser avec un chien de conduite. C'est l'exemple le plus courant d'un jeu anodin qui déclenche un vrai trouble.",
  src:"Dehasse · McConnell"},

d_fixation_objet:{fin:true,niv:"clinique",titre:"Il fixe un objet sans fin",
  nature:"Entre l'œil et la compulsion",
  quoi:"Un chien de conduite peut reporter son regard fixe sur des objets : une balle, une porte, un point du mur. Tant que cela reste occasionnel et interruptible, c'est une expression de sa séquence sans support adapté. Quand cela devient impossible à interrompre et occupe l'essentiel de son temps, on change de catégorie.",
  cible:"Vérifier si c'est interruptible, et agir en conséquence.",
  exos:[
    {ou:"Test",t:"Pouvez-vous l'interrompre facilement ?",p:"Si oui, il manque surtout au chien une occupation adaptée. Si non, ou si cela revient aussitôt, consultez."},
    {ou:"Au quotidien",t:"Retirer l'objet et occuper le nez",p:"Supprimer le support et proposer une activité olfactive à la place résout beaucoup de fixations naissantes."},
    {ou:"Prudence",t:"Ne pas laisser s'installer",p:"Une fixation tolérée pendant des mois devient nettement plus difficile à défaire."}],
  piege:"Trouver ça amusant et l'encourager. Beaucoup de troubles installés ont commencé comme une drôlerie de famille.",
  src:"Dehasse · Coppinger"},

d_separation:{fin:true,niv:"clinique",titre:"Difficile quand il reste seul",
  nature:"Mal-être en l'absence du maître",
  quoi:"Aboiements, destructions, malpropreté, agitation dès le départ. Attention à la lecture : un chien de travail peut aussi mal supporter la solitude simplement parce qu'il n'a rien à faire. La distinction entre les deux compte, et elle se fait mieux avec un professionnel — filmer le chien seul est souvent l'élément le plus décisif.",
  cible:"Identifier de quoi il s'agit avant de choisir une approche.",
  exos:[
    {ou:"Diagnostic",t:"Filmer une absence",p:"Cela renseigne beaucoup mieux qu'un état des dégâts au retour : à quel moment ça commence, sous quelle forme, si ça retombe."},
    {ou:"Au quotidien",t:"Des départs sans mise en scène",p:"Départs et retours neutres, sans effusions ni préparatifs longs qui annoncent l'absence."},
    {ou:"Cadre",t:"Se faire accompagner si c'est intense",p:"Les situations sévères relèvent d'un suivi, parfois avec un accompagnement vétérinaire."}],
  piege:"Punir au retour. Le chien n'associe pas la punition à ce qu'il a fait une heure plus tôt, et l'attente du retour devient anxieuse.",
  src:"Dehasse · Donaldson"},

d_gardiennage:{fin:true,niv:"securite",grave:true,titre:"Il grogne près de sa gamelle ou d'un objet",
  nature:"Protection de ressource",
  quoi:"Le chien se raidit, grogne ou montre les dents quand on approche de sa nourriture, d'un objet ou d'un endroit. C'est un comportement fréquent et cohérent du point de vue du chien, mais qui présente un risque réel de morsure, en particulier avec des enfants.",
  cible:"Éviter tout affrontement immédiatement, et se faire accompagner.",
  exos:[
    {ou:"Immédiat",t:"Ne rien retirer de force",p:"Chaque confrontation aggrave le comportement et augmente le risque. Faites échanger contre mieux plutôt que de prendre."},
    {ou:"Immédiat",t:"Protéger l'entourage",p:"Enfants tenus à l'écart des repas et des couchages, sans exception, pendant toute la durée du travail."},
    {ou:"Cadre",t:"Accompagnement nécessaire",p:"C'est un domaine où la marge d'erreur est faible. Aucun protocole ne devrait être appliqué seul depuis une page web, y compris celle-ci."}],
  piege:"Mettre la main dans la gamelle « pour lui montrer qui commande ». C'est le conseil le plus répandu et l'un des plus dangereux : il confirme au chien que votre approche annonce une perte.",
  src:"Donaldson · Dehasse"},

d_shutdown:{fin:true,niv:"terrain",titre:"Il se démoralise en séance",
  nature:"Renoncement",
  quoi:"Le chien se couche, se fige, ralentit, ne propose plus rien. Ce n'est pas du calme : c'est un arrêt. Cela survient quand les échecs s'accumulent, quand la pression est trop forte, ou quand le chien ne comprend plus ce qu'on attend. Un chien qui a renoncé n'apprend plus rien.",
  cible:"Faire réussir, tout de suite, sur quelque chose de très facile.",
  exos:[
    {ou:"Immédiat",t:"Arrêter la séance",p:"Rien de bon ne sortira de la suite. On arrête et on reprend plus tard sur un exercice acquis."},
    {ou:"Ensuite",t:"Ne demander que ce qu'il sait faire",p:"Plusieurs séances entières sur des choses réussies, sans nouveauté. On reconstruit l'envie de proposer."},
    {ou:"Ensuite",t:"Réexaminer sa progression",p:"Un renoncement signale presque toujours des étapes trop grandes ou des critères qui changent d'une séance à l'autre."}],
  piege:"Interpréter l'immobilité comme de la sagesse. Un chien qui ne propose plus rien n'est pas un chien calme.",
  src:"Donaldson · Rugaas"},

d_surchauffe_seance:{fin:true,niv:"clinique",titre:"Trop excité pour apprendre",
  nature:"Excitation incompatible avec l'apprentissage",
  quoi:"Il saute, aboie, tourne, ne tient pas en place dès qu'une séance commence. Souvent parce que la séance est devenue le moment le plus stimulant de la journée. Un chien dans cet état ne mémorise presque rien : l'apprentissage demande un niveau d'excitation moyen, ni trop bas ni trop haut.",
  cible:"Faire commencer les séances au calme.",
  exos:[
    {ou:"Avant",t:"Un rituel calme d'entrée",p:"Quelques minutes d'immobilité avant de commencer. On ne démarre pas tant que le chien n'est pas posé."},
    {ou:"Pendant",t:"Alterner action et immobilité",p:"Trente secondes d'exercice, trente secondes de calme. Le calme fait partie de la séance, ce n'est pas une pause."},
    {ou:"Autour",t:"Réduire l'attente avant la séance",p:"Un chien qui voit les préparatifs pendant dix minutes arrive déjà saturé."}],
  piege:"Attendre qu'il se calme tout seul en le laissant s'exciter. L'excitation ne retombe pas d'elle-même chez ces chiens, elle s'entretient.",
  src:"Donaldson · McConnell"},

d_regression:{fin:true,niv:"terrain",titre:"Il savait le faire et il ne le fait plus",
  nature:"Perte d'un acquis",
  quoi:"Un geste maîtrisé qui se dégrade a généralement une cause identifiable : critères qui ont glissé sans qu'on s'en aperçoive, contexte qui a changé, douleur qui s'installe, ou acquis qui n'avait jamais été aussi solide qu'on le croyait.",
  cible:"Trouver ce qui a changé, plutôt que de réapprendre par-dessus.",
  exos:[
    {ou:"D'abord",t:"Vérifier le physique",p:"Une régression sur les positions — assis, couché, sauts, arrêts — est souvent le premier signe d'une gêne."},
    {ou:"Ensuite",t:"Revenir au niveau où ça marchait",p:"Baissez jusqu'à obtenir une réussite systématique, puis remontez plus lentement qu'avant."},
    {ou:"Ensuite",t:"Vérifier ce que vous avez changé",p:"Position, ton, moment, lieu, récompense. Les régressions viennent très souvent d'un changement du côté humain."}],
  piege:"Répéter beaucoup plus. On consolide alors la version dégradée.",
  src:"Donaldson"},

d_seance_longue:{fin:true,niv:"terrain",titre:"Des séances trop longues",
  nature:"Format inadapté",
  quoi:"Les longues séances répétitives produisent surtout de la fatigue et de la lassitude. La qualité d'une séance se mesure au nombre de bonnes répétitions, pas à sa durée — et les bonnes répétitions se raréfient vite.",
  cible:"Raccourcir fortement et multiplier les occasions.",
  exos:[
    {ou:"Format",t:"Trois minutes, plusieurs fois par jour",p:"Plus efficace qu'une demi-heure quotidienne, et bien plus facile à tenir dans une vraie journée."},
    {ou:"Format",t:"Arrêter sur une réussite",p:"Toujours. Une séance qui s'arrête bien donne envie de recommencer."},
    {ou:"Repère",t:"Compter les bonnes répétitions",p:"Dix bonnes valent mieux que quarante moyennes."}],
  piege:"Continuer parce que « ça vient presque ». C'est en général le moment où la qualité a déjà commencé à baisser.",
  src:"Donaldson · Scrimgeour"},

d_criteres:{fin:true,niv:"science",titre:"Il ne comprend pas ce qu'on attend",
  nature:"Critères flous ou trop grands",
  quoi:"Quand un chien n'apprend pas, la cause la plus fréquente n'est pas son intelligence mais la façon dont l'exercice est découpé. Deux erreurs reviennent tout le temps : demander une trop grosse marche d'un coup, et changer discrètement d'exigence d'une séance à l'autre.",
  cible:"Découper plus finement et fixer une exigence stable.",
  exos:[
    {ou:"Méthode",t:"Une seule chose à la fois",p:"Durée, distance, distraction : jamais deux ensemble. Si vous augmentez la distance, vous baissez tout le reste."},
    {ou:"Méthode",t:"Écrire le critère avant de commencer",p:"Sachez précisément ce que vous acceptez et ce que vous n'acceptez pas, avant la séance. C'est le remède le plus efficace au flou."},
    {ou:"Méthode",t:"Taux de réussite autour de huit sur dix",p:"Si le chien échoue plus souvent, l'exercice est trop dur. S'il réussit toujours, il n'apprend plus rien."}],
  piege:"Croire que le chien est lent. Dans l'immense majorité des cas, c'est le découpage de l'exercice qui est en cause.",
  src:"Donaldson"},

d_arret_derive:{fin:true,niv:"reserve",titre:"Chien d'arrêt — l'arrêt ne tient pas",
  nature:"Fiche de lecture, hors module complet",
  quoi:"Le chien coule sur le gibier, part à l'envol, ou refuse d'avancer sur ordre. Ces défauts se lisent dans la même grammaire : chez le chien d'arrêt, la poursuite a été éteinte par la sélection et le blocage exagéré. Un chien qui part à l'envol est un chien chez qui cette extinction ne tient plus sous l'excitation.",
  cible:"Ce module n'est pas construit — voici seulement où chercher.",
  exos:[
    {ou:"Honnêteté",t:"Cet outil ne traite pas encore la chasse",p:"Aucun exercice précis n'est proposé ici, parce qu'il n'a pas été bâti au niveau d'exigence du module troupeau."},
    {ou:"Référence",t:"Le manuel de Godard",p:"Je dresse mon chien d'arrêt reste la référence française la plus utilisée pour braques, épagneuls, griffons, pointers et setters."},
    {ou:"Cadre",t:"Les clubs de race et field trials",p:"Le dressage du sage à l'envol et au coup de feu se transmet sur le terrain, avec du gibier et des gens qui en font."}],
  piege:"Appliquer au chien d'arrêt les recettes du chien de troupeau. Les deux métiers coupent la séquence à deux endroits opposés.",
  src:"Godard · Coppinger & Feinstein"},

d_gueule_dure:{fin:true,niv:"reserve",titre:"Rapport — il abîme le gibier",
  nature:"Fiche de lecture, hors module complet",
  quoi:"Le chien rapporte mais serre, mâchouille ou secoue. Dans la grammaire de la séquence, la saisie a été conservée chez les rapporteurs mais adoucie, et le geste de secousse éteint. Une gueule dure signale que cette modération ne tient plus, souvent sous l'effet de l'excitation.",
  cible:"Ce module n'est pas construit — voici seulement où chercher.",
  exos:[
    {ou:"Honnêteté",t:"Aucun protocole détaillé ici",p:"Le rapport se travaille avec du matériel spécifique et une progression que cet outil n'a pas encore établie sérieusement."},
    {ou:"Repère",t:"Le geste est régulé, pas absent",p:"On ne cherche pas à supprimer la saisie chez un rapporteur, seulement à la maintenir douce."},
    {ou:"Cadre",t:"Clubs du groupe 8",p:"Une vingtaine de races partagent ce métier, avec des épreuves de travail et des encadrants qui le pratiquent."}],
  piege:"Corriger dans la gueule du chien au moment de la remise. C'est le meilleur moyen d'obtenir un chien qui n'ose plus rapporter du tout.",
  src:"Société centrale canine — groupe 8"},

d_nez_derive:{fin:true,niv:"reserve",titre:"Travail du nez — il perd la piste ou change de trace",
  nature:"Fiche de lecture, hors module complet",
  quoi:"Perdre la voie dans les angles, lever la tête, partir sur une autre trace : ce sont les difficultés classiques du travail olfactif. Il faut savoir une chose que beaucoup ignorent : le stress dégrade fortement la capacité du chien à travailler du nez, et un chien pressé travaille moins bien qu'un chien calme.",
  cible:"Ce module n'est pas construit — voici seulement où chercher.",
  exos:[
    {ou:"Honnêteté",t:"Aucune progression détaillée ici",p:"Les étapes du pistage — prise d'odeur, tenue de piste, angles, objets, désignation — méritent mieux qu'un résumé approximatif."},
    {ou:"Référence",t:"Ortega, Le Flair du chien",p:"Ouvrage français de référence sur le pistage et la détection, cité comme base par les praticiens de la discipline."},
    {ou:"Cadre",t:"Les règlements officiels",p:"La recherche utilitaire est une discipline reconnue avec quatre niveaux et des exigences précises. C'est le cadre qui définit le travail."}],
  piege:"Presser le chien pour qu'il avance. Le travail du nez demande du temps, et l'agitation du conducteur se transmet directement à la qualité de la recherche.",
  src:"Ortega · règlements SCC"},

d_sport_derive:{fin:true,niv:"reserve",titre:"Discipline encadrée — passer par son club",
  nature:"Hors périmètre de conseil",
  quoi:"Agility, obérythmée, sauvetage, mordant sportif, attelage : ces disciplines ont leurs règlements, leurs progressions et leurs encadrants. Certaines, comme le sauvetage ou le mordant, comportent des contraintes techniques et de sécurité qui rendent tout conseil général inutile, voire risqué.",
  cible:"Ce module n'est pas construit, et il ne le sera pas au niveau du conseil technique.",
  exos:[
    {ou:"Honnêteté",t:"Cet outil ne conseillera pas sur ces disciplines",p:"Elles supposent un encadrement direct. Une page web ne peut ni voir la séance ni corriger un geste dangereux."},
    {ou:"Ce qui reste utile",t:"La lecture de l'état du chien",p:"Excitation, saturation, signaux de désamorçage, seuil d'apprentissage : ces notions valent dans toutes les disciplines, et se trouvent dans les fiches précédentes."},
    {ou:"Cadre",t:"Le club et la commission concernée",p:"Chaque discipline a une commission qui publie ses règlements et forme ses juges et ses encadrants."}],
  piege:"Chercher en ligne des protocoles de disciplines à risque. C'est exactement le cas où une information partielle fait plus de mal que pas d'information du tout.",
  src:"Règlements des commissions SCC"}
};
