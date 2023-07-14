import { IDL_DEBUG_ADAPTER_LOG } from '@idl/logger';
import { IDL_TRANSLATION } from '@idl/translation';
import { IDL_DEBUG_OUTPUT_CHANNEL, IDL_LOGGER } from '@idl/vscode/client';
import { appendFileSync } from 'fs';

import { CreateHistoryFile } from './create-history-file';
import { OUTPUT_CONFIG } from './log-output';

/**
 * Logs output data being sent to IDL
 */
export function LogSessionStart() {
  // set as first for special formatting considerations
  OUTPUT_CONFIG.FIRST = true;

  // add empty space to separate
  IDL_DEBUG_OUTPUT_CHANNEL.appendLine('');

  // make our log file (indicates which file we use for input/output)
  CreateHistoryFile();

  const toWrite = `idl started ${new Date().toISOString()}`;

  IDL_DEBUG_OUTPUT_CHANNEL.appendLine(toWrite);

  // check if we need to write to our log file
  if (OUTPUT_CONFIG.FILE !== '') {
    try {
      appendFileSync(OUTPUT_CONFIG.FILE, `\n${toWrite}\n`);
    } catch (err) {
      IDL_LOGGER.log({
        type: 'error',
        log: IDL_DEBUG_ADAPTER_LOG,
        content: [IDL_TRANSLATION.debugger.errors.addHistory, err],
        alert: IDL_TRANSLATION.debugger.errors.addHistory,
      });
      OUTPUT_CONFIG.FILE = '';
    }
  }
}
