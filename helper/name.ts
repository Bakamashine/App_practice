const abc = "abcdefghijklmnopqrstuvyxyz"
const abc_array = abc.split("")
export function GenerateName(file_extension: string, count = 15) {
    let result_str = ""
    for (let i =0; i<count; i++) {
        result_str += abc_array[Math.floor(Math.random() * count)];
    }
    return `${result_str}.${file_extension}`
}