use crate::tree::FileNode;

pub fn generator_ascii(node:&FileNode)->String {


    let mut result = String::new();

    result.push_str(&node.name);
    result.push('\n');

    generate_children(&node.children, "", &mut result);

    result

}

pub fn generate_children(children: &[FileNode], prefix:&str, result:&mut String) {
    for (index,child) in children.iter().enumerate() {
        let is_last  = index == children.len() - 1;

        let symbol = if is_last {
            "└── "
        } else {
            "├── "
        };
        result.push_str(&format!("{}{}{}\n",prefix,symbol,child.name));

        if !child.children.is_empty() {
            let new_prefix = if is_last { "    " } else { "│   " };
             generate_children(&child.children, &format!("{}{}", prefix, new_prefix), result);
        }
    }
}