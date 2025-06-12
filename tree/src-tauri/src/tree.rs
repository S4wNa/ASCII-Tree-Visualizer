use std::path::PathBuf;
use serde::{Deserialize, Serialize};

#[derive(Debug,Clone, Serialize, Deserialize,Default)]
pub struct FileNode {
    pub name:String, // Name
    pub node_type:NodeType, // File or Folder
    pub children:Vec<FileNode>,
    pub path:PathBuf // the complete path 
}
#[derive(Debug,Clone, Serialize, Deserialize,Default)]
pub enum NodeType {
    File { extension: Option<String> }, 
    #[default]
    Folder
}
#[derive(Debug,Clone, Serialize, Deserialize,Default)]
pub struct TreeConfig  { 
    pub depth:u32,
    pub exclude: Vec<String>
}

impl FileNode {
    pub fn new(name:&str) ->Self {
        FileNode {
            name:name.to_string(),
            node_type:NodeType::Folder,
            children: Vec::new(),
            path:PathBuf::from(name),
        }
    }
}