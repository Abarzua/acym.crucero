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
// 2. BASE DE DATOS DE CUMPLEAÑOS ACYM CRUCERO
// Actualizada: 18 de Mayo de 2026 (Extraída desde Excel oficial)
// ============================================================================
const birthdays = [
    // ENERO
    { month: 0, day: 1, date: "1 de Enero", name: "Hno. Matias Flores Mella", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Matias! Que el Señor Jesús te bendiga en este día especial, te cuide mucho y te regale un día lleno de juegos y alegría.\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6" },
    { month: 0, day: 1, date: "1 de Enero", name: "Hno. Maximiliano Sobarzo Henriquez", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Maximiliano! Que el Señor Jesús te bendiga en este día especial, te cuide mucho y te regale un día lleno de juegos y alegría.\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6" },
    { month: 0, day: 1, date: "1 de Enero", name: "Hna. Sofia Elizabeth Flores Mella", type: "F-N", message: "🎉 ¡Feliz cumpleaños, Sofia! Que el Señor te llene de bendiciones hoy y siempre. Disfruta mucho tu día junto a tu familia.\n\n📖 *\"Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos.\"* - Mateo 19:14" },
    { month: 0, day: 6, date: "6 de Enero", name: "Hna. Loreto Alejandra Henriquez Pérez", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Loreto! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.\"* - Jeremías 29:11" },
    { month: 0, day: 9, date: "9 de Enero", name: "Hno. Santiago Alejandro Abarzúa Vera", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Santiago! Que el Señor Jesús te bendiga en este día especial, te cuide mucho y te regale un día lleno de juegos y alegría.\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6" },
    { month: 0, day: 10, date: "10 de Enero", name: "Hna. Claudia Beatriz Soto Navarro", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Claudia! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.\"* - Jeremías 29:11" },
    { month: 0, day: 10, date: "10 de Enero", name: "Hno. Patricio Enrique Martínez Silva", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Patricio! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 0, day: 11, date: "11 de Enero", name: "Hno. Hebert Daniel Prieto Seguel", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Hebert! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 0, day: 18, date: "18 de Enero", name: "Hno. Benjamin Vargas Huinca", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Benjamin! Que el Señor Jesús te bendiga en este día especial, te cuide mucho y te regale un día lleno de juegos y alegría.\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6" },
    { month: 0, day: 20, date: "20 de Enero", name: "Hno. Richard Esteban Flores Hernández", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Richard! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    
    // FEBRERO
    { month: 1, day: 1, date: "1 de Febrero", name: "Hna. Daniela Julieta Vera Pérez", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Daniela! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 1, day: 2, date: "2 de Febrero", name: "Hna. Herminda Candelaria Navarro Quilempan", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Herminda! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 1, day: 2, date: "2 de Febrero", name: "Hna. Ulda Del Carmen Delgado Corona", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Ulda! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 1, day: 8, date: "8 de Febrero", name: "Hna. Sonia Delgado Ortiz", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Sonia! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 1, day: 11, date: "11 de Febrero", name: "Hna. Maria Julieta Pérez Pérez", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Maria! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 1, day: 13, date: "13 de Febrero", name: "Hno. Neftali Martínez Altamirano", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Neftali! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 1, day: 18, date: "18 de Febrero", name: "Hno. Patricio Enrique Martínez Altamirano", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Patricio! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 1, day: 22, date: "22 de Febrero", name: "Hna. Sudelia Elizabeth Maldonado Vidal", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Sudelia! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // MARZO
    { month: 2, day: 7, date: "7 de Marzo", name: "Pastor Florentino Joel Nauto Maldonado", type: "M-A", message: "🎂 ¡Feliz cumpleaños, Pastor Florentino! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 2, day: 13, date: "13 de Marzo", name: "Hna. Francisca Antonia Abarzúa Vera", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Francisca! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 2, day: 18, date: "18 de Marzo", name: "Hno. Luis Antonio Abarzúa Fuentealba", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Luis! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 2, day: 26, date: "26 de Marzo", name: "Hna. Luisa Adriana Montiel Cardenas", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Luisa! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // ABRIL
    { month: 3, day: 15, date: "15 de Abril", name: "Hno. Alberto Vera Maldonado", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Alberto! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 3, day: 28, date: "28 de Abril", name: "Hna. Rosa Rumualda Sandalla Vega", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Rosa! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // MAYO
    { month: 4, day: 1, date: "1 de Mayo", name: "Hno. Joaquín Antonio Abarzúa Vera", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Joaquín! Que el Señor Jesús te bendiga en este día especial, te cuide mucho y te regale un día lleno de juegos y alegría.\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6" },
    { month: 4, day: 19, date: "19 de Mayo", name: "Hno. Arnoldo Rivera Ríos", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Arnoldo! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 4, day: 21, date: "21 de Mayo", name: "Hna. Isabel Francisca Prieto Herrera", type: "F-N", message: "🎉 ¡Feliz cumpleaños, Isabel! Que el Señor te llene de bendiciones hoy y siempre. Disfruta mucho tu día junto a tu familia.\n\n📖 *\"Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos.\"* - Mateo 19:14" },
    
    // JUNIO
    { month: 5, day: 1, date: "1 de Junio", name: "Hno. Alfredo Martínez", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Alfredo! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 5, day: 4, date: "4 de Junio", name: "Hna. Carolina Elisabeth Mella Quinchel", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Carolina! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 5, day: 30, date: "30 de Junio", name: "Hna. Maria Cristina Escobar Silva", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Maria! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // JULIO
    { month: 6, day: 15, date: "15 de Julio", name: "Hno. Diego Vargas", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Diego! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 6, day: 30, date: "30 de Julio", name: "Hna. Corina Ester Gonzalez Cisterna", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Corina! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // AGOSTO
    { month: 7, day: 5, date: "5 de Agosto", name: "Hno. Rubén Orlando Solís Pérez", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Rubén! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 7, day: 10, date: "10 de Agosto", name: "Hno. Sergio Ríos Corona", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Sergio! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 7, day: 16, date: "16 de Agosto", name: "Hna. Maithe Escobar Solis", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Maithe! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 7, day: 24, date: "24 de Agosto", name: "Hna. Joselyn Danae Herrera Sandalla", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Joselyn! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 7, day: 25, date: "25 de Agosto", name: "Hno. Nicolas Antonio Sobarzo Martinez", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Nicolas! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 7, day: 25, date: "25 de Agosto", name: "Hna. Rossy Vanessa Nicol Herrera Sandalla", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Rossy! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 7, day: 26, date: "26 de Agosto", name: "Hna. Estela Grumilda Monje Cortez", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Estela! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 7, day: 30, date: "30 de Agosto", name: "Hna. Nicole Antonella Prieto Herrera", type: "F-N", message: "🎉 ¡Feliz cumpleaños, Nicole! Que el Señor te llene de bendiciones hoy y siempre. Disfruta mucho tu día junto a tu familia.\n\n📖 *\"Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos.\"* - Mateo 19:14" },
    
    // SEPTIEMBRE
    { month: 8, day: 1, date: "1 de Septiembre", name: "Hno. Domingo Rojas González", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Domingo! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 8, day: 2, date: "2 de Septiembre", name: "Hna. Catherine Alicia Solis Escobar", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Catherine! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 8, day: 17, date: "17 de Septiembre", name: "Pastora Rossi Shela Soto Cardenas", type: "F-A", message: "🌸 ¡Feliz cumpleaños, Pastora Rossi! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 8, day: 24, date: "24 de Septiembre", name: "Hna. Marta Elena Quintul Puchi", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Marta! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // OCTUBRE
    { month: 9, day: 6, date: "6 de Octubre", name: "Hno. Aly Aristeo Martínez Silva", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Aly! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 9, day: 20, date: "20 de Octubre", name: "Hno. Isaac Vera Maldonado", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Isaac! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 9, day: 21, date: "21 de Octubre", name: "Hno. Amaro Valentino Abarzúa Vera", type: "M-N", message: "🎈 ¡Feliz cumpleaños, Amaro! Que el Señor Jesús te bendiga en este día especial, te cuide mucho y te regale un día lleno de juegos y alegría.\n\n📖 *\"Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.\"* - Proverbios 22:6" },
    { month: 9, day: 24, date: "24 de Octubre", name: "Hna. Sindy Carolina Huinca Rodríguez", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Sindy! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // NOVIEMBRE
    { month: 10, day: 24, date: "24 de Noviembre", name: "Hno. Luis Waldemar Huinca Rogel", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Luis! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 10, day: 27, date: "27 de Noviembre", name: "Hna. Elisa Ester Martinez Olivera", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Elisa! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    
    // DICIEMBRE
    { month: 11, day: 3, date: "3 de Diciembre", name: "Hna. Bernardita Del Carmen Altamirano Altamirano", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Bernardita! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 11, day: 7, date: "7 de Diciembre", name: "Hna. Dina Noemi Gallardo Estrada", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Dina! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 11, day: 8, date: "8 de Diciembre", name: "Hna. Palmenia Del Transito Rodríguez Moris", type: "F-A", message: "🌸 ¡Feliz cumpleaños, hermana Palmenia! Damos gracias a Dios por su vida y su fidelidad. Que tenga un día lleno del amor de los suyos y del cuidado celestial.\n\n📖 *\"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal...\"* - Jeremías 29:11" },
    { month: 11, day: 22, date: "22 de Diciembre", name: "Hno. Luis Eduardo Huinca Rodríguez", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Luis! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 11, day: 26, date: "26 de Diciembre", name: "Hno. Jorge Domingo Herrera Ríos", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Jorge! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" },
    { month: 11, day: 27, date: "27 de Diciembre", name: "Hno. Domingo Antonio Herrera Orostegui", type: "M-A", message: "🎂 ¡Feliz cumpleaños, hermano Domingo! De parte de toda la congregación le enviamos un abrazo afectuoso. Que la gracia y la paz de nuestro Dios le acompañen siempre en este nuevo año de vida.\n\n📖 *\"El justo florecerá como la palmera; Crecerá como cedro en el Líbano.\"* - Salmos 92:12" }
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
