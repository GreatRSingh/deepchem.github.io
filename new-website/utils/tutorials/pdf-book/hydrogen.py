import os
import pandas
import pypdf
from pypdf import PdfReader, PdfWriter


INFO_PATH = "/workspaces/deepchem.github.io/new-website/utils/tutorials/website-render-order"
DATA_PATH = "/workspaces/deepchem.github.io/new-website/utils/tutorials/ipynb-notebooks"
PDF_PATH = "/workspaces/deepchem.github.io"
TEX = ['jupyter nbconvert --to latex']
PDF = ['yes "''" | xelatex ', ' -quite']

def main():
    # Get all files in the directory
    files = os.listdir(INFO_PATH)
    files = sorted(files)

    for i in range(0, 10):
        file = pandas.read_csv(INFO_PATH + '/' + str(files[i]))
        file_names = file['File Name']
        for file in file_names:
            file_path = DATA_PATH + '/' + file
            runner_1 = open('hydrogen.sh', 'a')
            runner_1.write(TEX[0] + ' ' + file_path + '\n')

    for i in range(0, 10):
        file = pandas.read_csv(INFO_PATH + '/' + str(files[i]))
        file_names = file['File Name']
        for file in file_names:
            file_path = DATA_PATH + '/' + file[:-5] + 'tex'
            runner_1 = open('helium.sh', 'a')
            runner_1.write(PDF[0] + file_path + PDF[1] + '\n')

    pdf_file = []
    all_file = os.listdir(PDF_PATH)
    for file in all_file:
        if file[-3:] == 'pdf':
            pdf_file.append(PDF_PATH + '/' + file)
    writer = PdfWriter()
    for filename in pdf_file:
        pdfFileObj = open(filename, 'rb')
        pdfReader = PdfReader(pdfFileObj)
        for i in range(len(pdfReader.pages)):
            pageObj = pdfReader.pages[i]
            writer.add_page(pageObj)
    # Name of the PDF file can be written here.
    pdfOutput = open('DeepChem Book.pdf', 'wb') 

    # Writing the output file using the pdfWriter function.
    writer.write(pdfOutput)
    pdfOutput.close()

files = os.listdir(INFO_PATH)
files = sorted(files)

def rename():
    for i in range(0, 10):
        file = pandas.read_csv(INFO_PATH + '/' + str(files[i]))
        file_names = file['File Name']
        file_names_new = file['Title']
        for file, file_new in zip(file_names, file_names_new):
            file_path = DATA_PATH + '/' + file
            file_path_new = DATA_PATH + '/' + file_new
            os.system('mv "{}" "{}"'.format(file_path, file_path_new))

def ipynb_to_tex():
    for i in range(0, 10):
        file = pandas.read_csv(INFO_PATH + '/' + str(files[i]))
        file_names = file['Title']
        for file in file_names:
            file_path = DATA_PATH + '/' + file
            runner_1 = open('hydrogen.sh', 'a')
            runner_1.write(TEX[0] + ' ' + file_path + '\n')

def tex_to_pdf():
    for i in range(0, 10):
        file = pandas.read_csv(INFO_PATH + '/' + str(files[i]))
        file_names = file['Title']
        for file in file_names:
            file_path = DATA_PATH + '/' + file
            runner_1 = open('helium.sh', 'a')
            runner_1.write(PDF[0] + "'{}'".format(file_path) + PDF[1] + '\n')

def pdf_to_book():
    for i in range(0, 10):
        file = pandas.read_csv(INFO_PATH + '/' + str(files[i]))
        file_names = file['File Name']
        for file in file_names:
            pass

if __name__ == '__main__':
    #main()
    os.system('sh /workspaces/deepchem.github.io/helium.sh')
    #rename()
    #ipynb_to_tex()
    #os.system('sh /workspaces/deepchem.github.io/hydrogen.sh')
    #tex_to_pdf()
