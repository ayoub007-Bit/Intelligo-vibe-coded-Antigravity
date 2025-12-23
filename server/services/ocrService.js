const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const { default: Poppler } = require('node-poppler');

const extractText = async (filePath, mimeType) => {
    try {
        let extractedText = '';

        if (mimeType === 'application/pdf') {
            console.log('\n📄 ========== EXTRACTION PDF ==========');
            console.log('Fichier:', path.basename(filePath));

            // PASS 1: pdf-parse
            try {
                const dataBuffer = fs.readFileSync(filePath);
                console.log('📦 Taille:', (dataBuffer.length / 1024).toFixed(2), 'KB');

                const parse = pdfParse.default || pdfParse;
                const data = await parse(dataBuffer);
                extractedText = (data.text || '').trim();

                console.log('\n✅ PASS 1 - pdf-parse:');
                console.log('   Pages:', data.numpages);
                console.log('   Texte:', extractedText.length, 'caractères');

            } catch (pdfError) {
                console.error('\n❌ PASS 1 échoué:', pdfError.message);
            }

            // PASS 2: Poppler + OCR pour PDF scannés
            if (extractedText.length < 100) {
                console.log('\n🔄 PASS 2 - PDF scanné → Conversion + OCR');

                try {
                    // Configurer Poppler
                    const popplerPath = 'C:\\poppler\\Library\\bin';
                    console.log('   🔧 Chemin Poppler:', popplerPath);

                    // Vérifier que le chemin existe
                    if (!fs.existsSync(popplerPath)) {
                        throw new Error(`Poppler introuvable: ${popplerPath}`);
                    }
                    console.log('   ✅ Chemin Poppler existe');

                    const poppler = new Poppler(popplerPath);

                    const outputDir = path.dirname(filePath);
                    const outputPrefix = path.join(outputDir, `temp_${Date.now()}`);

                    console.log('   📄 Conversion PDF → PNG...');
                    console.log('   Input:', filePath);
                    console.log('   Output prefix:', outputPrefix);

                    // Convertir en images
                    try {
                        const result = await poppler.pdfToCairo(filePath, outputPrefix, {
                            pngFile: true,
                            singleFile: false,
                            resolutionXYAxis: 300,
                        });
                        console.log('   📋 Poppler terminé');
                    } catch (convError) {
                        console.error('   ❌ Erreur conversion:', convError.message);
                        throw convError;
                    }

                    // Attendre un peu que les fichiers soient écrits
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Trouver les images
                    const files = fs.readdirSync(outputDir);
                    console.log('   📁 Fichiers dans le dossier:', files.length);

                    const imageFiles = files.filter(f =>
                        f.startsWith(path.basename(outputPrefix)) && f.endsWith('.png')
                    ).sort();

                    console.log(`   ✅ ${imageFiles.length} page(s) convertie(s):`, imageFiles);

                    if (imageFiles.length === 0) {
                        throw new Error('Aucune image générée par Poppler');
                    }

                    // OCR sur chaque page
                    const allText = [];
                    for (let i = 0; i < Math.min(imageFiles.length, 5); i++) {
                        const imagePath = path.join(outputDir, imageFiles[i]);
                        console.log(`\n   🖼️  OCR page ${i + 1}/${imageFiles.length}...`);

                        const result = await Tesseract.recognize(imagePath, 'fra+eng', {
                            logger: m => {
                                if (m.status === 'recognizing text') {
                                    const progress = Math.round(m.progress * 100);
                                    if (progress % 25 === 0) {
                                        console.log(`      → ${progress}%`);
                                    }
                                }
                            }
                        });

                        const pageText = (result.data.text || '').trim();
                        if (pageText.length > 0) {
                            allText.push(`\n=== PAGE ${i + 1} ===\n${pageText}`);
                        }

                        console.log(`   ✅ Page ${i + 1}: ${pageText.length} caractères`);

                        // Nettoyer
                        try { fs.unlinkSync(imagePath); } catch (e) { }
                    }

                    extractedText = allText.join('\n\n');
                    console.log('\n✅ PASS 2 terminé:', extractedText.length, 'caractères');

                } catch (popplerError) {
                    console.error('\n❌ PASS 2 échoué:', popplerError.message);
                    console.error('   Stack:', popplerError.stack);

                    extractedText = '⚠️ PDF SCANNÉ - Erreur de conversion\n\n' +
                        `Erreur: ${popplerError.message}\n\n` +
                        'Solution: Convertissez le PDF en images JPG/PNG et téléversez-les.';
                }
            }

        } else if (mimeType.startsWith('image/')) {
            console.log('\n🖼️  ========== OCR IMAGE ==========');
            console.log('Fichier:', path.basename(filePath));
            console.log('⏳ OCR en cours...\n');

            const result = await Tesseract.recognize(filePath, 'fra+eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round(m.progress * 100);
                        if (progress % 15 === 0) {
                            console.log(`   📊 ${progress}%`);
                        }
                    }
                }
            });

            extractedText = (result.data.text || '').trim();
            console.log('\n✅ OCR terminé:', extractedText.length, 'caractères');

        } else if (mimeType === 'text/plain') {
            console.log('\n📝 ========== TEXTE ==========');
            extractedText = fs.readFileSync(filePath, 'utf8').trim();
            console.log('✅ Lu:', extractedText.length, 'caractères');

        } else {
            throw new Error('Type non supporté: ' + mimeType);
        }

        // VALIDATION
        console.log('\n========================================');

        if (extractedText.length === 0) {
            console.warn('⚠️  AUCUN TEXTE');
            console.log('========================================\n');
            return 'Aucun texte extrait. Document vide ou corrompu.';
        }

        console.log('✅ SUCCÈS');
        console.log('   Total:', extractedText.length, 'caractères');
        console.log('   Aperçu:', extractedText.substring(0, 100).replace(/\s+/g, ' ') + '...');
        console.log('========================================\n');

        return extractedText;

    } catch (error) {
        console.error('\n❌ ERREUR:', error.message);
        console.log('========================================\n');
        throw error;
    }
};

module.exports = { extractText };