const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

async function createPdf(input, output){
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));

        //MODIFY SPACE

        const fieldNames = pdfDoc.getForm().getFields().map((f) => f.getName());
        console.log({fieldNames});

        const form = pdfDoc.getForm();

        form.getTextField('adi').setText('Ahmet Faruk Arslan');

        const pdfBytes = await pdfDoc.save();


        await writeFile(output, pdfBytes);
        console.log('Pdf olusturuldu');
    } catch(err){
        console.log(err);
    }
}

createPdf('emptyform.pdf', 'output.pdf');