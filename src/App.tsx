/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from './context/ThemeContext';
import { KismatioApp } from './components/chat-home/KismatioApp';

export default function App() {
  return (
    <ThemeProvider>
      <KismatioApp />
    </ThemeProvider>
  );
}

