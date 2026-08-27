import json
import re

log_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\f7298256-5f0a-40c5-b227-a1b695ed3a3e\.system_generated\logs\transcript_full.jsonl"
recovered = ""

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        content = data.get('content', '')
        if isinstance(content, str) and 'The following code has been modified to include a line number' in content and 'index.html' in content:
            recovered += content + "\n\n"
        if isinstance(content, str) and 'Created file file:///C:/Users/HP/Desktop/saq-building-materials/index.html' in content:
            recovered += content + "\n\n"
        # also check tool_calls
        tool_calls = data.get('tool_calls', [])
        for tc in tool_calls:
            if tc.get('function', {}).get('name') == 'default_api:write_to_file':
                args = tc.get('function', {}).get('arguments', '')
                if 'index.html' in args:
                    recovered += args + "\n\n"

with open("recovered_log.txt", "w", encoding="utf-8") as out:
    out.write(recovered)
