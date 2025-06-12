
mod scanner;
mod tree;
mod generators;

use scanner::FileScanner; 
use tree::TreeConfig;
use generators::generator_ascii;

#[tauri::command]
 fn scan_directory(path: String) -> Result<String, String> {
    let config = TreeConfig {
        depth: 5,
        exclude: vec!["node_modules".to_string(),
        "target".to_string(),
        "dist".to_string(),
        ".git".to_string(),],
    };
    let scanner = FileScanner::new(config);  
    match scanner.scan(&path) {
        Ok(tree) =>{
            let ascii_tree = generator_ascii(&tree);
            Ok(ascii_tree)
        }
        Err(e) => Err(e.to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![scan_directory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}