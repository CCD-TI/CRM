import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export class GoogleSheet {
  private static instance: GoogleSheet;
  private doc!: GoogleSpreadsheet;
  private sheetId!: number;

  private constructor(email: string, private_key: string, SPREADSHEET_ID: string, sheetId: number) {
    const SCOPES = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ];

    const jwt = new JWT({
      email: email,
      key: private_key.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });

    //const SPREADSHEET_ID = "1PzWQDHZ9LKHi0gGFZ6ZT_9hvDG4PSCIEFt2Jm_L24E0";
    this.doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    this.sheetId = sheetId;
  }
  
  static async getInstance(
    email?: string,
    private_key?: string,
    spreadsheetId?: string,
    sheetId?: number,
    callback?: (instance: GoogleSheet) => Promise<void>
  ): Promise<GoogleSheet> {

    if (!email || !private_key) {
      throw new Error("No hay instancia previa y faltan las credenciales.");
    }
    GoogleSheet.instance = new GoogleSheet(email, private_key, spreadsheetId!, sheetId!);
    await GoogleSheet.instance.doc.loadInfo();
    if (callback) {
      await callback(GoogleSheet.instance);
    }

    return GoogleSheet.instance;
  }

  async addRow(num: string, camp: string, name: string | null) {
    try {
      console.log("datos que e envian a sheet: ",{num, camp, name});
      const sheet = this.doc.sheetsById[this.sheetId];
      await sheet.addRow({
        FECHA: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
        NOMBRE: name ? name : "SIN NOMBRE",
        NUMERO: num,
        CAMPAÑA: camp,
        RED: "Whatsapp",
        MENSAJE: "Mensaje Enviado",
      });
    } catch (error: any) {
      console.log("error al enviar sheet: ", error.message)
    }
    
  }
  getDoc(): GoogleSpreadsheet{
    return this.doc;
  }
}
