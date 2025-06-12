use crate::tree::{FileNode,NodeType,TreeConfig};
use ignore::WalkBuilder;
use anyhow::Result;
use std::path::Path;
pub struct FileScanner {
    pub config:TreeConfig ,   
}
 impl FileScanner {
    pub fn new(config:TreeConfig)->Self{
        FileScanner {config}
    }
}

impl FileScanner {
    pub fn scan<P: AsRef<Path>>(&self, path: P) -> Result<FileNode, anyhow::Error> {
    let mut root = FileNode::new("root");
    let base_path = path.as_ref().to_path_buf();
    let walker = 
        WalkBuilder::new(&base_path)
        .max_depth(Some(self.config.depth as usize))
        .git_ignore(true)
        .git_global(true)
        .git_exclude(true)
        .hidden(false)
        .parents(true)
        .ignore(true)
        .standard_filters(false)    
        .require_git(false)          
        .add_custom_ignore_filename(".gitignore") 
        .build();
    
    for entry in walker {
        let entry = entry?;
        let path = entry.path();
        
        // ✅ FILTRAGE MANUEL - ignorer les dossiers indésirables
        let path_str = path.to_string_lossy();
        let should_skip = self.config.exclude.iter().any(|pattern| {
            path_str.contains(pattern)
        });
        
        if should_skip {
            continue; // Ignorer ce fichier/dossier
        }
        
        let is_file = entry.file_type().unwrap().is_file();
        let relative_path = entry.path().strip_prefix(&base_path)?;
        
        let path_parts: Vec<String> = relative_path
            .components()
            .map(|c| c.as_os_str().to_string_lossy().to_string())
            .filter(|s| !s.is_empty())
            .collect();
        
        if path_parts.is_empty() {
            continue;
        }
        self.insert_into_tree(&mut root, is_file, path_parts);
    }
    
    Ok(root)
}
    fn find_or_create_child<'a>(&self, parent: &'a mut FileNode, name: String, is_folder: bool) -> &'a mut FileNode {
    
    let existing_index = parent.children
        .iter()
        .position(|child| child.name == name);
    
    match existing_index {
        Some(index) => {
            // println!("Trouvé: {:?}", parent.children[index].name);
            &mut parent.children[index]
        }
        None => {
            // println!("Pas trouvé, création...");
            let new_node = FileNode {
                name: name.clone(),
                node_type: if is_folder {
                    NodeType::Folder
                } else {
                    NodeType::File { extension: None }
                },
                children: Vec::new(),
                path: parent.path.join(&name),
            };
            
            parent.children.push(new_node);
            let last_index = parent.children.len() - 1;
            &mut parent.children[last_index]
        }
    }
}

         fn insert_into_tree(&self, root:&mut FileNode, is_file:bool,path_parts:Vec<String> ) {

            let mut current_node = root;
            for (index,part) in path_parts.iter().enumerate() {
                let is_last_part = index == path_parts.len()-1;
                let is_folder = if is_last_part {
                    !is_file
                } else {
                    true
                };
                current_node = self.find_or_create_child(current_node,part.clone(), is_folder);
            }
         }
}

