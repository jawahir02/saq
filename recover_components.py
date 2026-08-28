import json
import os

log_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\f7298256-5f0a-40c5-b227-a1b695ed3a3e\.system_generated\logs\transcript_full.jsonl"
recovered = ""

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        tool_calls = data.get('tool_calls', [])
        for tc in tool_calls:
            if tc.get('function', {}).get('name') == 'default_api:write_to_file':
                args = tc.get('function', {}).get('arguments', '')
                if isinstance(args, str):
                    try:
                        args_dict = json.loads(args)
                        filename = args_dict.get('TargetFile', '')
                        if 'components.js' in filename:
                            recovered += f"Found write to {filename}:\n"
                            recovered += args_dict.get('CodeContent', '') + "\n\n---\n"
                    except:
                        pass
                elif isinstance(args, dict):
                    filename = args.get('TargetFile', '')
                    if 'components.js' in filename:
                        recovered += f"Found write to {filename}:\n"
                        recovered += args.get('CodeContent', '') + "\n\n---\n"

with open("components_recovered2.txt", "w", encoding="utf-8") as out:
    out.write(recovered)
