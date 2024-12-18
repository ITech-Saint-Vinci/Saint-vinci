import fs from 'fs';

export type CsvRecord =  {
  'Niveau': string;
  'Nom Élève': string;
  'Prénom Élève': string;
  'Date de Naissance': string;
  'Nom Professeur': string;
}

export const parseCSV = (csvPath: string): CsvRecord[] => {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim() as keyof CsvRecord] = values[index].trim();
      return obj;
    }, {} as CsvRecord);
  });
}

export const serializeData = (input: string): string => input.toLowerCase().replace(/\s+/g, '_');
