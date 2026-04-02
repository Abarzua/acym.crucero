/**
 * ============================================================================
 * ARCHIVO PRINCIPAL DE LÓGICA FRONTEND - ACyM CRUCERO
 * Autor: Comunidad ACyM / Hno. Antonio Abarzúa
 * Año: 2026
 * ============================================================================
 * COLABORADORES:
 * Este archivo gestiona:
 * 1. La navegación tipo SPA (Single Page Application).
 * 2. Los menús responsivos.
 * 3. La base de datos local de cumpleaños.
 * 4. El contador inteligente para el próximo cumpleaños.
 * 5. Los filtros y el buscador de cumpleaños.
 * ============================================================================
 */

const navMap = {
    'inicio': ['nav-inicio', 'mob-nav-inicio'],
    'historia': ['nav-acerca', 'subnav-historia', 'mob-nav-acerca', 'mob-subnav-historia'],
    'mision': ['nav-acerca', 'subnav-mision', 'mob-nav-acerca', 'mob-subnav-mision'],
    'fe': ['nav-acerca', 'subnav-fe', 'mob-nav-acerca', 'mob-subnav-fe'],
    'ufa': ['nav-deptos', 'subnav-ecles', 'subnav-ufa', 'mob-nav-deptos', 'mob-subnav-ecles', 'mob-subnav-ufa'],
    'eedd': ['nav-deptos', 'subnav-paraecles', 'subnav-eedd', 'mob-nav-deptos', 'mob-subnav-paraecles', 'mob-subnav-eedd'],
    'estudio': ['nav-deptos', 'subnav-paraecles', 'subnav-estudio', 'mob-nav-deptos', 'mob-subnav-paraecles', 'mob-subnav-estudio'],
    'consejo': ['nav-hermandad', 'subnav-consejo', 'mob-nav-hermandad', 'mob-subnav-consejo'],
    'galeria': ['nav-hermandad', 'subnav-galeria', 'mob-nav-hermandad', 'mob-subnav-galeria'],
    'cumpleanos': ['nav-hermandad', 'subnav-cumpleanos', 'mob-nav-hermandad', 'mob-subnav-cumpleanos']
};

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById('sec-' + sectionId).classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

    const activeIds = navMap[sectionId] || [];
    activeIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    });

    const mobileMenu = document.getElementById('mobile-menu');
    if(!mobileMenu.classList.contains('hidden') && window.innerWidth < 1024) {
        toggleMobileMenu();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
}

function toggleMobDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const icon = document.getElementById('icon-' + dropdownId);
    dropdown.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
}


// ----------------------------------------------------------------------------
// 2. BASE DE DATOS LOCAL DE CUMPLEAÑOS
// ----------------------------------------------------------------------------
const birthdays = [
    // ENERO
    { month: 0, day: 1, date: "1 de Enero", name: "Maximiliano Sobarzo Henríquez", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Maxi! Que el Señor te bendiga mucho en este día especial. Es una alegría verte crecer en nuestra congregación. ¡Un abrazo grande de parte de toda la iglesia!\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6 (RVR1960)" },
    { month: 0, day: 1, date: "1 de Enero", name: "Matías Flores", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Matías! Que el Señor te bendiga muchísimo hoy. Oramos para que Dios guíe siempre tus pasos. ¡Un abrazo grande!\n\n📖 *\"No tengo yo mayor gozo que este, el oír que mis hijos andan en la verdad.\"* - 3 Juan 1:4 (RVR1960)" },
    { month: 0, day: 1, date: "1 de Enero", name: "Sofía Flores", type: "F-N", message: "🎈 ¡Feliz cumpleaños, Sofía! Que tengas un día hermoso. Le pedimos a Dios que te cuide, te proteja y te llene de alegría. ¡Te queremos mucho!\n\n📖 *\"Te alabaré; porque formidables, maravillosas son tus obras; Estoy maravillado, Y mi alma lo sabe muy bien.\"* - Salmos 139:14 (RVR1960)" },
    { month: 0, day: 6, date: "6 de Enero", name: "Hna. Loreto Alejandra Henriquez", type: "F-A", message: "🎂 ¡Feliz cumpleaños, querida hermana Loreto! Le enviamos un abrazo lleno de cariño. Que en este nuevo año de vida el Señor renueve sus fuerzas y le siga guiando en cada paso.\n\n📖 *\"Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia.\"* - Números 6:24-25 (RVR1960)" },
    { month: 0, day: 9, date: "9 de Enero", name: "Santiago Alejandro Abarzúa", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Santiago! Que tengas un día hermoso lleno de juegos y alegría. Que Dios cuide siempre tu vida.\n\n📖 *\"Y Jesús crecía en sabiduría y en estatura, y en gracia para con Dios y los hombres.\"* - Lucas 2:52 (RVR1960)" },
    { month: 0, day: 10, date: "10 de Enero", name: "Hna. Claudia Beatriz Soto", type: "F-A", message: "🎉 ¡Muy feliz cumpleaños, hermana Claudia! Que el gozo del Señor sea su fortaleza hoy y siempre. Disfrute mucho su día junto a sus seres queridos.\n\n📖 *\"Deléitate asimismo en Jehová, Y él te concederá las peticiones de tu corazón.\"* - Salmos 37:4 (RVR1960)" },
    { month: 0, day: 20, date: "20 de Enero", name: "Hno. Richard Esteban Flores", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Richard! Un abrazo grande de parte de la congregación. Que este nuevo año venga cargado de las ricas bendiciones de nuestro Dios para su vida.\n\n📖 *\"Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.\"* - Josué 1:9 (RVR1960)" },
    { month: 0, day: 31, date: "31 de Enero", name: "Hna. Luzmira Del Carmen Bello", type: "F-A", message: "🌸 ¡Feliz cumpleaños, querida hermana Luzmira! Damos gracias a Dios por su vida y le deseamos un día hermoso. Que el Señor la siga rodeando con su amor inagotable.\n\n📖 *\"Con amor eterno te he amado; por tanto, te prolongué mi misericordia.\"* - Jeremías 31:3 (RVR1960)" },

    // FEBRERO
    { month: 1, day: 1, date: "1 de Febrero", name: "Hna. Daniela Julieta Vera", type: "F-A", message: "🎂 ¡Feliz cumpleaños, hermana Daniela! Que tenga un día maravilloso. Agradecemos a Dios por su vida y su servicio.\n\n📖 *\"Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, Y él enderezará tus veredas.\"* - Proverbios 3:5-6 (RVR1960)" },
    { month: 1, day: 2, date: "2 de Febrero", name: "Hna. Herminda Navarro", type: "F-A", message: "🌸 ¡Feliz cumpleaños, querida hermana Herminda! Honramos su vida y damos gracias a Dios por su ejemplo en medio nuestro. Que el Señor la siga llenando de vigor y alegría.\n\n📖 *\"Aun en la vejez, cuando ya peinen canas, yo seré el mismo, yo los sostendré. Yo los hice, y cuidaré de ustedes; los sostendré y los libraré.\"* - Isaías 46:4 (RVR1960)" },
    { month: 1, day: 2, date: "2 de Febrero", name: "Hna. Ulda Delgado", type: "F-A", message: "🌸 ¡Feliz cumpleaños, querida hermana Ulda! Celebramos su vida y agradecemos a Dios por tenerla en nuestra congregación. Que Su gracia la acompañe cada día de este nuevo año.\n\n📖 *\"Aun en la vejez fructificarán; Estarán vigorosos y verdes, Para anunciar que Jehová mi fortaleza es recto...\"* - Salmos 92:14-15 (RVR1960)" },
    { month: 1, day: 8, date: "8 de Febrero", name: "Hna. Sonia Delgado", type: "F-A", message: "🎂 ¡Feliz cumpleaños, hermana Sonia! Le mandamos un abrazo con mucho afecto. Confiamos en que Dios tiene cuidado de su vida y le regalará un año de mucha bendición.\n\n📖 *\"Mas los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.\"* - Isaías 40:31 (RVR1960)" },
    { month: 1, day: 11, date: "11 de Febrero", name: "Hna. Maria Julieta Pérez", type: "F-A", message: "🌸 ¡Muy feliz cumpleaños, hermana Julieta! Es una bendición tenerla en nuestra familia espiritual. Que hoy reciba mucho cariño y el Señor la guarde siempre.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano. Plantados en la casa de Jehová, En los atrios de nuestro Dios florecerán.\"* - Salmos 92:12-13 (RVR1960)" },
    { month: 1, day: 13, date: "13 de Febrero", name: "Neftalí Martínez", type: "M-N", message: "🎉 ¡Feliz cumpleaños, Neftalí! Que Dios te bendiga muchísimo en tu día. Que este nuevo año de vida esté lleno de aprendizaje y del respaldo del Señor.\n\n📖 *\"Acuérdate de tu Creador en los días de tu juventud...\"* - Eclesiastés 12:1 (RVR1960)" },
    { month: 1, day: 18, date: "18 de Febrero", name: "Patricio Enrique Martínez (Hijo)", type: "M-N", message: "🎂 ¡Muy feliz cumpleaños, Patricio! Te enviamos un gran abrazo. Que el Señor guíe tus pasos y te dé sabiduría en todo lo que emprendas en esta etapa de tu vida.\n\n📖 *\"¿Con qué limpiará el joven su camino? Con guardar tu palabra.\"* - Salmos 119:9 (RVR1960)" },
    { month: 1, day: 22, date: "22 de Febrero", name: "Hna. Sudelia Elizabeth Maldonado", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Sudelia! Que la gracia y el favor de Dios le acompañen en este nuevo año. Disfrute su día junto a su familia.\n\n📖 *\"Jehová es mi pastor; nada me faltará.\"* - Salmos 23:1 (RVR1960)" },

    // MARZO
    { month: 2, day: 7, date: "7 de Marzo", name: "Pastor Florentino Joel Nauto", type: "M-A", message: "📖 ¡Muy feliz cumpleaños, Pastor Florentino! Honramos su vida, su llamado y su trabajo pastoral. Que el Señor le siga dando gracia, sabiduría y renueve sus fuerzas cada mañana.\n\n📖 *\"Ten cuidado de ti mismo y de la doctrina; persiste en ello, pues haciendo esto, te salvarás a ti mismo y a los que te oyeren.\"* - 1 Timoteo 4:16 (RVR1960)" },
    { month: 2, day: 13, date: "13 de Marzo", name: "Francisca Antonia Abarzúa", type: "F-N", message: "🎉 ¡Feliz cumpleaños, Francisca! Que el Señor te conceda un día hermoso y un año lleno de alegrías. ¡Un abrazo de toda tu iglesia!\n\n📖 *\"Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.\"* - 1 Timoteo 4:12 (RVR1960)" },
    { month: 2, day: 18, date: "18 de Marzo", name: "Hno. Luis Antonio Abarzúa", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Luis! Que la paz de Dios gobierne su corazón y que sus proyectos en este nuevo año sean prosperados por la mano del Señor.\n\n📖 *\"Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados.\"* - Proverbios 16:3 (RVR1960)" },

    // ABRIL
    { month: 3, day: 28, date: "28 de Abril", name: "Hna. Rosita Sandalla", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Rosa! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.\"* - Jeremías 29:11 (RVR1960)" },

    // MAYO
    { month: 4, day: 1, date: "1 de Mayo", name: "Joaquín Antonio Abarzúa", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Joaquín! Que lo pases súper bien en tu día. Le pedimos a Dios que te cuide mucho y te haga un niño muy sabio.\n\n📖 *\"Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de Dios.\"* - Marcos 10:14 (RVR1960)" },
    { month: 4, day: 19, date: "19 de Mayo", name: "Hno. Arnoldo Rivera (Feno)", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Arnoldo! Le enviamos un afectuoso saludo. Que Dios bendiga su salir y su entrar, y le guarde en todos sus caminos.\n\n📖 *\"Jehová guardará tu salida y tu entrada Desde ahora y para siempre.\"* - Salmos 121:8 (RVR1960)" },

    // JUNIO
    { month: 5, day: 3, date: "1 de Junio", name: "Hno. Alfredo Martínez", type: "M-A", message: "🌟 ¡Feliz cumpleaños, amado hermano Alfredo! Es un privilegio celebrar su vida. Damos gloria a Dios por sus años y por ser una columna en nuestra congregación.\n\n📖 *\"Corona de honra es la vejez Que se halla en el camino de justicia.\"* - Proverbios 16:31 (RVR1960)" },
    { month: 5, day: 4, date: "4 de Junio", name: "Hna. Carolina Elisabeth Mella", type: "F-A", message: "🎂 ¡Feliz cumpleaños, hermana Carolina! Deseamos que pase un día maravilloso y que el Señor le conceda las peticiones más profundas de su corazón.\n\n📖 *\"Bendito el varón que confía en Jehová, y cuya confianza es Jehová.\"* - Jeremías 17:7 (RVR1960)" },
    { month: 5, day: 30, date: "30 de Junio", name: "Hna. Maria Cristina Escobar", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Cristina! Bendecimos su vida y su vocación. Que el Señor multiplique su gracia sobre usted en este nuevo año.\n\n📖 *\"El alma generosa será prosperada; Y el que saciare, él también será saciado.\"* - Proverbios 11:25 (RVR1960)" },

    // JULIO (Hermana Corina retirada de la lista)

    // AGOSTO
    { month: 7, day: 5, date: "5 de Agosto", name: "Hno. Rubén Orlando Solís", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Rubén! Que la gracia de Dios abunde en su vida y en su hogar durante este nuevo año que comienza hoy.\n\n📖 *\"Bienaventurado el varón que no anduvo en consejo de malos... Sino que en la ley de Jehová está su delicia.\"* - Salmos 1:1-2 (RVR1960)" },
    { month: 7, day: 10, date: "10 de Agosto", name: "Hno. Sergio Ríos", type: "M-A", message: "🌟 ¡Feliz cumpleaños, querido hermano Sergio! Damos gracias a Dios por su vida. Que el Señor le siga brindando paz y le sostenga con su diestra justa.\n\n📖 *\"Porque yo Jehová soy tu Dios, quien te sostiene de tu mano derecha, y te dice: No temas, yo te ayudo.\"* - Isaías 41:13 (RVR1960)" },
    { month: 7, day: 16, date: "16 de Agosto", name: "Maithe Escobar", type: "F-N", message: "🎉 ¡Feliz cumpleaños, Maithe! Disfruta mucho tu día. Que Dios te guíe siempre y cumpla Su propósito en tu vida.\n\n📖 *\"Reconócelo en todos tus caminos, Y él enderezará tus veredas.\"* - Proverbios 3:6 (RVR1960)" },
    { month: 7, day: 25, date: "25 de Agosto", name: "Hno. Nicolas Antonio Sobarzo", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Nicolas! Deseamos que Dios le brinde un año lleno de éxitos y bendiciones en todo lo que emprenda.\n\n📖 *\"Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma.\"* - 3 Juan 1:2 (RVR1960)" },
    { month: 7, day: 26, date: "26 de Agosto", name: "Hna. Estela Grumilde Monje", type: "F-A", message: "🌸 ¡Feliz cumpleaños, querida hermana Estela! Celebramos su vida con alegría. Que la presencia constante de Dios sea su mayor consuelo y gozo.\n\n📖 *\"El que habita al abrigo del Altísimo Morará bajo la sombra del Omnipotente.\"* - Salmos 91:1 (RVR1960)" },

    // SEPTIEMBRE
    { month: 8, day: 2, date: "2 de Septiembre", name: "Hna. Catherine Alicia Solís", type: "F-A", message: "🎂 ¡Feliz cumpleaños, hermana Catherine! Que tenga un día precioso. Le deseamos que el favor de Dios le acompañe a lo largo de este nuevo año.\n\n📖 *\"Engañosa es la gracia, y vana la hermosura; La mujer que teme a Jehová, ésa será alabada.\"* - Proverbios 31:30 (RVR1960)" },
    { month: 8, day: 17, date: "17 de Septiembre", name: "Hna. Rossi Shela Soto", type: "F-A", message: "🌸 ¡Muy feliz cumpleaños, Pastora Rossi! Bendecimos su vida, su familia y su ministerio. Damos gracias a Dios por su dedicación y amor hacia la congregación.\n\n📖 *\"Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia; Jehová alce sobre ti su rostro, y ponga en ti paz.\"* - Números 6:24-26 (RVR1960)" },

    // OCTUBRE
    { month: 9, day: 20, date: "20 de Octubre", name: "Hno. Isaac Vera", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Isaac! Le enviamos un fuerte abrazo. Seguimos creyendo en la obra de Dios en su vida y le deseamos mucha fortaleza.\n\n📖 *\"Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.\"* - Jeremías 33:3 (RVR1960)" },
    { month: 9, day: 21, date: "21 de Octubre", name: "Amaro Valentino Abarzúa", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Amaro! Que seas muy feliz en tu día y que el Señor proteja cada uno de tus pasos mientras sigues creciendo.\n\n📖 *\"Mi porción es Jehová, dijo mi alma; por tanto, en él esperaré.\"* - Lamentaciones 3:24 (RVR1960)" },
    { month: 9, day: 24, date: "24 de Octubre", name: "Hna. Sindy Carolina Huinca", type: "F-A", message: "🎉 ¡Feliz cumpleaños, hermana Sindy! Deseamos de corazón que este nuevo año le traiga abundante salud y las ricas bendiciones del cielo.\n\n📖 *\"He aquí que yo les traeré sanidad y medicina; y los curaré, y les revelaré abundancia de paz y de verdad.\"* - Jeremías 33:6 (RVR1960)" },

    // NOVIEMBRE
    { month: 10, day: 24, date: "24 de Noviembre", name: "Hno. Luis Waldemar Huinca", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Luis! Que pase un excelente día. Que el Señor prospere el trabajo de sus manos y bendiga su hogar.\n\n📖 *\"Sea la luz de Jehová nuestro Dios sobre nosotros, Y la obra de nuestras manos confirma sobre nosotros...\"* - Salmos 90:17 (RVR1960)" },

    // DICIEMBRE
    { month: 11, day: 3, date: "3 de Diciembre", name: "Hna. Bernardita Altamirano", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Bernardita! En este tiempo, la abrazamos de manera especial. Que la gracia y la paz de Cristo inunden su corazón hoy y siempre.\n\n📖 *\"Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.\"* - Filipenses 4:7 (RVR1960)" },
    { month: 11, day: 7, date: "7 de Diciembre", name: "Hna. Dina Noemi Gallardo", type: "F-A", message: "🎂 ¡Feliz cumpleaños, hermana Dina! Que el Señor le conceda un hermoso día. Agradecemos a Dios por su constancia y amor por la obra.\n\n📖 *\"Bueno es Jehová a los que en él esperan, al alma que le busca.\"* - Lamentaciones 3:25 (RVR1960)" },
    { month: 11, day: 8, date: "8 de Diciembre", name: "Hna. Palmenia Rodríguez", type: "F-A", message: "🌸 ¡Muy feliz cumpleaños, hermana Palmenia! Confiamos en que Dios tiene grandes propósitos para este nuevo año y que Su sanidad sigue fluyendo en su vida.\n\n📖 *\"Mas a vosotros los que teméis mi nombre, nacerá el Sol de justicia, y en sus alas traerá salvación...\"* - Malaquías 4:2 (RVR1960)" },
    { month: 11, day: 26, date: "26 de Diciembre", name: "Hno. Jorge Domingo Herrera", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Jorge! Un gran saludo de toda la congregación. Que el favor de nuestro Dios descanse sobre usted todos los días de este nuevo año.\n\n📖 *\"Cercano está Jehová a todos los que le invocan, A todos los que le invocan de veras.\"* - Salmos 145:18 (RVR1960)" },
    { month: 11, day: 27, date: "27 de Diciembre", name: "Hno. Domingo Antonio Herrera", type: "M-A", message: "🎉 ¡Feliz cumpleaños, hermano Domingo! Que la alegría del Señor sea su fuerza y que pase un excelente día en compañía de su familia.\n\n📖 *\"Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él.\"* - Salmos 118:24 (RVR1960)" }
];

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const typeConfig = {
    "M-A": { icon: "fa-user-tie", bg: "bg-blue-600" },
    "F-A": { icon: "fa-person-dress", bg: "bg-rose-600" },
    "M-N": { icon: "fa-child", bg: "bg-cyan-500" },
    "F-N": { icon: "fa-child-dress", bg: "bg-pink-500" },
    "Mix": { icon: "fa-users", bg: "bg-purple-500" }
};

let currentFilteredData = [...birthdays];

function calculateNextBirthday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const currentYear = today.getFullYear();
    
    let minDays = 9999;
    let upcoming = [];

    birthdays.forEach(b => {
        let bDate = new Date(currentYear, b.month, b.day);
        
        if (bDate < today) {
            bDate.setFullYear(currentYear + 1);
        }
        
        const diffTime = bDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < minDays) {
            minDays = diffDays;
            upcoming = [b];
        } else if (diffDays === minDays) {
            upcoming.push(b);
        }
    });

    if (upcoming.length > 0) {
        const alertBox = document.getElementById('next-birthday-alert');
        alertBox.classList.remove('hidden');

        const names = upcoming.map(b => b.name).join(' y ');
        document.getElementById('next-birthday-name').innerText = names;
        document.getElementById('next-birthday-date').innerText = upcoming[0].date;

        let countText = minDays;
        let labelText = "Días";

        if (minDays === 0) {
            countText = "¡HOY!";
            labelText = "¡Felicítalos!";
            alertBox.classList.add('animate-pulse');
        } else if (minDays === 1) {
            countText = "1";
            labelText = "Día (Mañana)";
        }

        document.getElementById('next-birthday-countdown').innerText = countText;
        document.getElementById('next-birthday-label').innerText = labelText;
    }
}

function applyFilters() {
    const searchText = document.getElementById('search-name').value.toLowerCase();
    const selectedMonth = document.getElementById('filter-month').value;
    
    currentFilteredData = birthdays.filter(b => {
        const matchName = b.name.toLowerCase().includes(searchText);
        const matchMonth = selectedMonth === "all" ? true : b.month === parseInt(selectedMonth);
        return matchName && matchMonth;
    });
    
    renderCalendar(currentFilteredData, searchText !== "" || selectedMonth !== "all");
}

function clearFilters() {
    document.getElementById('search-name').value = '';
    document.getElementById('filter-month').value = 'all';
    applyFilters();
}

document.getElementById('search-name').addEventListener('input', applyFilters);
document.getElementById('filter-month').addEventListener('change', applyFilters);

function renderCalendar(dataToRender, isFiltered = false) {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    const selectedMonth = document.getElementById('filter-month').value;
    const monthsData = Array.from({length: 12}, () => []);
    dataToRender.forEach(b => monthsData[b.month].push(b));

    monthsData.forEach((monthBirthdays, index) => {
        if (selectedMonth !== "all" && parseInt(selectedMonth) !== index) return;
        if (isFiltered && monthBirthdays.length === 0 && selectedMonth === "all") return;

        const monthDiv = document.createElement('div');
        monthDiv.className = "glass-card rounded-2xl p-5 relative overflow-hidden h-full flex flex-col border-t-4 border-acym-orange/70";
        
        const bgNumber = document.createElement('div');
        bgNumber.className = "absolute -right-4 -top-8 text-9xl font-bold opacity-10 text-white select-none pointer-events-none";
        bgNumber.innerText = index + 1;
        monthDiv.appendChild(bgNumber);

        const title = document.createElement('h3');
        title.className = "text-xl font-bold text-acym-blue mb-4 border-b border-gray-200/50 pb-2 z-10 flex items-center gap-2";
        title.innerHTML = `<i class="fa-regular fa-calendar-days text-acym-orange"></i> ${monthNames[index]}`;
        monthDiv.appendChild(title);

        const listContainer = document.createElement('div');
        listContainer.className = "flex flex-col gap-3 z-10 flex-grow overflow-y-auto max-h-[300px] scrollbar-thin pr-2";

        if (monthBirthdays.length === 0) {
            listContainer.innerHTML = `<p class="text-sm text-gray-500/80 italic text-center mt-4">Sin cumpleaños registrados</p>`;
        } else {
            monthBirthdays.forEach(b => {
                const item = document.createElement('button');
                item.className = `color-${b.type} text-left w-full rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 flex flex-col group flex-shrink-0`;
                item.onclick = () => openModal(b);

                item.innerHTML = `
                    <div class="flex justify-between items-start">
                        <span class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 group-hover:text-gray-700 transition-colors">${b.date}</span>
                        <i class="fa-solid ${typeConfig[b.type].icon} text-gray-400 text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                    <span class="font-semibold text-sm leading-tight text-gray-800">${b.name}</span>
                `;
                listContainer.appendChild(item);
            });
        }

        monthDiv.appendChild(listContainer);
        grid.appendChild(monthDiv);
    });
    
    if(dataToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center p-12 text-center bg-white/50 rounded-3xl border border-white/20 shadow-sm backdrop-blur-sm">
                <i class="fa-solid fa-face-frown text-5xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-700">No se encontraron hermanos</h3>
                <p class="text-gray-500 mt-2">Intenta buscar con otro nombre o limpia los filtros de búsqueda.</p>
            </div>
        `;
    }
}

const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
let currentMessage = "";

function openModal(birthday) {
    currentMessage = birthday.message;
    document.getElementById('modal-name').innerText = birthday.name;
    document.getElementById('modal-date').innerText = birthday.date;
    document.getElementById('modal-message').value = birthday.message;
    
    const iconEl = document.getElementById('modal-icon');
    iconEl.className = `w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-md ${typeConfig[birthday.type].bg}`;
    iconEl.innerHTML = `<i class="fa-solid ${typeConfig[birthday.type].icon}"></i>`;

    modalBackdrop.classList.remove('hidden');
    setTimeout(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modalBackdrop.classList.add('hidden');
    }, 300);
}

function copyToClipboard() {
    const textarea = document.getElementById('modal-message');
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
        navigator.clipboard.writeText(currentMessage).then(() => showToast()).catch(() => showToastFallback());
    } catch (err) {
        showToastFallback();
    }
}

function showToastFallback() {
    document.execCommand('copy');
    showToast();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('opacity-0', 'translate-y-10');
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10');
    }, 2500); 
}

modalBackdrop.addEventListener('click', function(e) {
    if (e.target === modalBackdrop) closeModal();
});

// ----------------------------------------------------------------------------
// 8. GALERÍA / MODAL DE IMÁGENES (LIGHTBOX)
// ----------------------------------------------------------------------------
const imageModal = document.getElementById('image-modal');
const modalImageSrc = document.getElementById('modal-image-src');

function openImageModal(src) {
    modalImageSrc.src = src;
    imageModal.classList.remove('hidden');
    setTimeout(() => {
        imageModal.classList.remove('opacity-0');
        modalImageSrc.classList.remove('scale-95');
        modalImageSrc.classList.add('scale-100');
    }, 10);
}

function closeImageModal() {
    imageModal.classList.add('opacity-0');
    modalImageSrc.classList.remove('scale-100');
    modalImageSrc.classList.add('scale-95');
    
    setTimeout(() => {
        imageModal.classList.add('hidden');
    }, 300);
}
window.onload = () => {
    renderCalendar(birthdays);
    calculateNextBirthday();
    showSection('inicio');
};
