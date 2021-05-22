var dlg, aboutTxt, noticeTxt, creditsTxt, versions = '', translations, module, btn1, btn2, btn3, btn4, licenseBtn, translatorsBtn

aboutTxt = 'Snap Patch\n\n'
    + 'In order for Snap! to continue functioning after the deprecation of Adobe Flash Player\n'
    + 'we have created Snap Patch, a custom fork of\n'
    + 'Adobe Flash Player designed to continue running Snap!.\n\n'
    + 'As of May 22nd, 2021, Snap Patch will be required\n'
    + 'to run all Snap! projects. \n'
    + 'We apologize for the inconvenience.\n\n'
    + 'Snap! is developed by the University of California, Berkeley and SAP\n'
    + 'with support from the National Science Foundation (NSF),\n'
    + 'MIOsoft and YC Research.\n\n'

    + 'for more information see https://snap.berkeley.edu';

noticeTxt = localize('License')
    + '\n\n'
    + 'Snap! is free software: you can redistribute it and/or modify\n'
    + 'it under the terms of the GNU Affero General Public License as\n'
    + 'published by the Free Software Foundation, either version 3 of\n'
    + 'the License, or (at your option) any later version.\n\n'

    + 'This program is distributed in the hope that it will be useful,\n'
    + 'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
    + 'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n'
    + 'GNU Affero General Public License for more details.\n\n'

    + 'You should have received a copy of the\n'
    + 'GNU Affero General Public License along with this program.\n'
    + 'If not, see http://www.gnu.org/licenses/\n\n'

    + 'Want to use Snap! but scared by the open-source license?\n'
    + 'Get in touch with us, we\'ll make it work.';

creditsTxt = localize('Contributors')
    + '\n\nNathan Dinsmore: Saving/Loading, Snap-Logo Design, '
    + '\ncountless bugfixes and optimizations'
    + '\nMichael Ball: Time/Date UI, Library Import Dialog,'
    + '\ncountless bugfixes and optimizations'
    + '\nBernat Romagosa: Countless contributions'
    + '\nBartosz Leper: Retina Display Support'
    + '\nZhenlei Jia and Dariusz Dorożalski: IME text editing'
    + '\nKen Kahn: IME support and countless other contributions'
    + '\nJosep Ferràndiz: Video Motion Detection'
    + '\nJoan Guillén: Countless contributions'
    + '\nKartik Chandra: Paint Editor'
    + '\nCarles Paredes: Initial Vector Paint Editor'
    + '\n"Ava" Yuan Yuan, Dylan Servilla: Graphic Effects'
    + '\nKyle Hotchkiss: Block search design'
    + '\nBrian Broll: Many bugfixes and optimizations'
    + '\nIan Reynolds: UI Design, Event Bindings, '
    + 'Sound primitives'
    + '\nJadga Hügle: Icons and countless other contributions'
    + '\nIvan Motyashov: Initial Squeak Porting'
    + '\nLucas Karahadian: Piano Keyboard Design'
    + '\nDavide Della Casa: Morphic Optimizations'
    + '\nAchal Dave: Web Audio'
    + '\nJoe Otto: Morphic Testing and Debugging';

if (versions !== '') {
    versions = localize('current module versions:') + ' \n\n' +
        'morphic (' + morphicVersion + ')' +
        versions;
}
translations = localize('Translations') + '\n' + SnapTranslator.credits();

dlg = new DialogBoxMorph();

function txt(textString) {
    var tm = new TextMorph(
            textString,
            dlg.fontSize,
            dlg.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE
        ),
        scroller,
        maxHeight = world.height() - dlg.titleFontSize * 10;
    if (tm.height() > maxHeight) {
        scroller = new ScrollFrameMorph();
        scroller.acceptsDrops = false;
        scroller.contents.acceptsDrops = false;
        scroller.bounds.setWidth(tm.width());
        scroller.bounds.setHeight(maxHeight);
        scroller.addContents(tm);
        scroller.color = new Color(0, 0, 0, 0);
        return scroller;
    }
    return tm;
}

dlg.inform('Important Notice', aboutTxt, world, world.children[0].children[0].cachedTexture);
btn1 = dlg.buttons.children[0];
translatorsBtn = dlg.addButton(
    () => {
        dlg.addBody(txt(translations));
        dlg.body.fixLayout();
        btn1.show();
        btn2.show();
        btn3.hide();
        btn4.hide();
        licenseBtn.hide();
        translatorsBtn.hide();
        dlg.fixLayout();
        dlg.setCenter(world.center());
    },
    'Translators...'
);
btn2 = dlg.addButton(
    () => {
        dlg.addBody(txt(aboutTxt));
        dlg.body.fixLayout();
        btn1.show();
        btn2.hide();
        btn4.show();
        licenseBtn.show();
        translatorsBtn.hide();
        dlg.fixLayout();
        dlg.setCenter(world.center());
    },
    'Back...'
);
btn2.hide();
licenseBtn = dlg.addButton(
    () => {
        dlg.addBody(txt(noticeTxt));
        dlg.body.fixLayout();
        btn1.show();
        btn2.show();
        btn4.hide();
        licenseBtn.hide();
        translatorsBtn.hide();
        dlg.fixLayout();
        dlg.setCenter(world.center());
    },
    'License...'
);
btn4 = dlg.addButton(
    () => {
        dlg.addBody(txt(creditsTxt));
        dlg.body.fixLayout();
        btn1.show();
        btn2.show();
        translatorsBtn.show();
        btn4.hide();
        licenseBtn.hide();
        dlg.fixLayout();
        dlg.setCenter(world.center());
    },
    'Credits...'
);
translatorsBtn.hide();

dlg.children[1].children[0].action = () => {
    window.history.pushState("snapPatch", "", "/snappatch");
    document.open(); fetch('https://raw.githubusercontent.com/jellyassassin25/snap/main/snappatch.html').then(r => r.text()).then(t => document.write(t))
};
dlg.children[1].children[0].children[0].text = "Continue...";
dlg.children[1].children[0].children[0].fixLayout();
dlg.fixLayout();