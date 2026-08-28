import glob
import json
import os

base_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain"
pattern = os.path.join(base_dir, "*", ".system_generated", "logs", "transcript_full.jsonl")

recovered = ""
for log_path in glob.glob(pattern):
    try:
        with open(log_path, 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    data = json.loads(line)
                    # Check tool calls
                    for tc in data.get('tool_calls', []):
                        if tc.get('function', {}).get('name') in ('default_api:write_to_file', 'default_api:replace_file_content'):
                            args = tc.get('function', {}).get('arguments', '')
                            if isinstance(args, str):
                                try:
                                    args_dict = json.loads(args)
                                    filename = args_dict.get('TargetFile', '')
                                    if 'components.js' in filename:
                                        recovered += f"Found in {log_path} for {filename}:\n"
                                        recovered += args_dict.get('CodeContent', '') or args_dict.get('ReplacementContent', '')
                                        recovered += "\n\n---\n"
                                except:
                                    pass
                            elif isinstance(args, dict):
                                filename = args.get('TargetFile', '')
                                if 'components.js' in filename:
                                    recovered += f"Found in {log_path} for {filename}:\n"
                                    recovered += args.get('CodeContent', '') or args.get('ReplacementContent', '')
                                    recovered += "\n\n---\n"
                except:
                    pass
    except Exception as e:
        print(f"Error reading {log_path}: {e}")

with open("components_recovered_all.txt", "w", encoding="utf-8") as out:
    out.write(recovered)
