/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CourseDetailPage from './pages/CourseDetail';
import GroupBuyDetailPage from './pages/GroupBuyDetail';
import MyGroupBuysPage from './pages/MyGroupBuys';
import PaymentConfirmationPage from './pages/PaymentConfirmation';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/group-buy/:id" element={<GroupBuyDetailPage />} />
          <Route path="/my-group-buys" element={<MyGroupBuysPage />} />
          <Route path="/confirm-payment/:id" element={<PaymentConfirmationPage />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
