import { readFileSync } from 'node:fs';
import { getInput, setOutput, setFailed, summary, getBooleanInput } from "@actions/core";
import { context } from "@actions/github";

try {
    const htmlFile = getInput("html_file");
    const jobSummary = getBooleanInput("job_summary");
    const { sha, repo: { owner, repo } } = context;
    console.log('htmlFile', htmlFile);
    const htmlContent = readFileSync(htmlFile, 'utf8');

    if (jobSummary) {
        summary
            .addHeading('HTML Preview Action')
            .addRaw(`Using HTML file: ${htmlFile}`)
            .addBreak()
            .addBreak()
            .addRaw(htmlContent)
            .write();
    }
} catch (e) {
    setFailed(e.message);
}
