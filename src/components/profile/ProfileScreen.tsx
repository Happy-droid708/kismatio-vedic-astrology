import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Settings,
  ShieldCheck,
  CreditCard,
  Package,
  Bookmark,
  HelpCircle,
  LogOut,
  ChevronRight,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Check,
  ExternalLink,
  RotateCcw,
  Zap,
  Globe,
  Bell,
  Lock,
  Sun,
  Moon,
} from 'lucide-react';
import { KundliData, OrderDetails } from '../../types/astrology';
import { useTheme } from '../../context/ThemeContext';

type ProfileSubPage = 'main' | 'personal_info' | 'orders' | 'wallet' | 'saved' | 'settings';

interface ProfileScreenProps {
  kundli: KundliData;
  onUpdateKundli: (updated: Partial<KundliData>) => void;
  currentOrder: OrderDetails | null;
  remainingSeconds: number;
  onOpenRecharge: () => void;
  onTrackOrder: () => void;
  onBackToChats: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  kundli,
  onUpdateKundli,
  currentOrder,
  remainingSeconds,
  onOpenRecharge,
  onTrackOrder,
  onBackToChats,
}) => {
  const { theme, setTheme } = useTheme();
  const [subPage, setSubPage] = useState<ProfileSubPage>('main');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editForm, setEditForm] = useState({
    name: kundli.name || 'Devanand Sharma',
    dob: kundli.dob || '14 October 1989',
    timeOfBirth: kundli.timeOfBirth || '07:42 AM',
    placeOfBirth: kundli.placeOfBirth || 'Jaipur, Rajasthan',
    gotra: kundli.gotra || 'Kashyapa',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Minutes calculation
  const remainingMinutes = Math.max(1, Math.ceil(remainingSeconds / 60));

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateKundli(editForm);
    setIsEditingInfo(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };

  // =========================================================================
  // SUB-PAGE: Personal Information (Section 19)
  // =========================================================================
  if (subPage === 'personal_info') {
    return (
      <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
        <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubPage('main')}
              className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:bg-[#181b28] cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#dfb76c]" />
            </button>
            <h2 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Personal Information
            </h2>
          </div>
          {!isEditingInfo && (
            <button
              onClick={() => setIsEditingInfo(true)}
              className="text-xs font-semibold text-[#dfb76c] hover:underline cursor-pointer"
            >
              Edit
            </button>
          )}
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 space-y-4 scrollbar-none">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Personal & birth coordinates updated successfully!</span>
            </div>
          )}

          {isEditingInfo ? (
            <form onSubmit={handleSavePersonalInfo} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-[#8e8779] block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2d3249] focus:border-[#dfb76c] text-xs text-[#ede8dc] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8e8779] block mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={editForm.dob}
                  onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                  placeholder="e.g. 14 October 1989"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2d3249] focus:border-[#dfb76c] text-xs text-[#ede8dc] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8e8779] block mb-1">Exact Time of Birth</label>
                <input
                  type="text"
                  value={editForm.timeOfBirth}
                  onChange={(e) => setEditForm({ ...editForm, timeOfBirth: e.target.value })}
                  placeholder="e.g. 07:42 AM"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2d3249] focus:border-[#dfb76c] text-xs text-[#ede8dc] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8e8779] block mb-1">Place of Birth (City, State)</label>
                <input
                  type="text"
                  value={editForm.placeOfBirth}
                  onChange={(e) => setEditForm({ ...editForm, placeOfBirth: e.target.value })}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2d3249] focus:border-[#dfb76c] text-xs text-[#ede8dc] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8e8779] block mb-1">Gotra (Lineage)</label>
                <input
                  type="text"
                  value={editForm.gotra}
                  onChange={(e) => setEditForm({ ...editForm, gotra: e.target.value })}
                  placeholder="e.g. Kashyapa"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#141724] border border-[#2d3249] focus:border-[#dfb76c] text-xs text-[#ede8dc] outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#161a29] text-[#a8a192] text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#121524] border border-[#dfb76c]/15 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-[#dfb76c]" />
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Full Name</span>
                    <span className="text-xs font-semibold text-[#fcedc5]">{kundli.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#dfb76c]" />
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Date of Birth</span>
                    <span className="text-xs text-[#ede8dc]">{kundli.dob}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#dfb76c]" />
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Time of Birth</span>
                    <span className="text-xs text-[#ede8dc]">{kundli.timeOfBirth}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#dfb76c]" />
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Place of Birth</span>
                    <span className="text-xs text-[#ede8dc]">{kundli.placeOfBirth}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#dfb76c]" />
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Gotra</span>
                    <span className="text-xs text-[#ede8dc]">{kundli.gotra || 'Kashyapa'}</span>
                  </div>
                </div>
              </div>

              {/* Astrological Chart Coordinates Card */}
              <div className="p-3.5 rounded-2xl bg-[#14182b] border border-[#dfb76c]/20 space-y-2">
                <span className="text-[10px] font-mono text-[#dfb76c] uppercase block">
                  ✦ Active Vedic Chart Coordinates
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Lagna (Ascendant)</span>
                    <span className="font-semibold text-[#fcedc5]">{kundli.lagna}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Moon Sign (Rashi)</span>
                    <span className="font-semibold text-[#fcedc5]">{kundli.moonSign}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Nakshatra</span>
                    <span className="font-semibold text-[#fcedc5]">{kundli.nakshatra} (Pada {kundli.pada || 2})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e8779] block">Current Mahadasha</span>
                    <span className="font-semibold text-amber-300">{kundli.currentMahadasha}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // SUB-PAGE: Orders & Tracking (Section 17 & 19)
  // =========================================================================
  if (subPage === 'orders') {
    return (
      <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
        <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubPage('main')}
              className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:bg-[#181b28] cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#dfb76c]" />
            </button>
            <h2 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Gemstone Orders & Consecration
            </h2>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 space-y-3.5 scrollbar-none">
          {currentOrder ? (
            <div className="p-4 rounded-2xl bg-[#121524] border border-[#dfb76c]/25 space-y-3 shadow-lg shadow-black/30">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#dfb76c] uppercase block">
                    Order #{currentOrder.orderId}
                  </span>
                  <h4 className="font-semibold text-sm text-[#fcedc5]">
                    {currentOrder.gemstone.name}
                  </h4>
                  <p className="text-[11px] text-[#8e8779] italic font-serif-luxury">
                    {currentOrder.selectedMetal.toUpperCase()} Ring · Size {currentOrder.ringSize}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Pooja in Progress</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#171b2e] border border-[#2b3350] space-y-1 text-xs">
                <div className="flex justify-between text-[#8e8779]">
                  <span>Vedic Sankalp:</span>
                  <span className="text-[#ede8dc] font-medium">{currentOrder.sankalpName} ({currentOrder.sankalpGotra} Gotra)</span>
                </div>
                <div className="flex justify-between text-[#8e8779]">
                  <span>Consecration Muhurat:</span>
                  <span className="text-[#dfb76c] font-medium">{currentOrder.muhuratDate}, {currentOrder.muhuratTime}</span>
                </div>
                <div className="flex justify-between text-[#8e8779]">
                  <span>Total Amount Paid:</span>
                  <span className="text-[#fcedc5] font-bold font-mono">₹{currentOrder.pricing.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onTrackOrder}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] font-semibold text-xs active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Track Consecration Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-[#8e8779] space-y-2">
              <Package className="w-8 h-8 mx-auto text-[#dfb76c]/40" />
              <p className="text-xs">No active gemstone orders found.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // SUB-PAGE: Wallet & Minutes Statement (Section 16 & 19)
  // =========================================================================
  if (subPage === 'wallet') {
    return (
      <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
        <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubPage('main')}
              className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:bg-[#181b28] cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#dfb76c]" />
            </button>
            <h2 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Chat Balance & Statement
            </h2>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 space-y-4 scrollbar-none">
          {/* Main Balance card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b2038] via-[#14172a] to-[#0d0f1a] border border-[#dfb76c]/30 shadow-xl shadow-black/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#dfb76c]" />
                <span className="text-xs font-mono uppercase text-[#dfb76c] font-medium tracking-wider">
                  Available Minutes
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                Active
              </span>
            </div>

            <div>
              <span className="font-display font-bold text-3xl text-[#fcedc5] tracking-tight">
                {remainingMinutes}
              </span>
              <span className="text-xs text-[#8e8779] ml-1.5">minutes remaining</span>
              <p className="text-[11px] text-[#9a9385] mt-0.5">
                Approx. ₹{(remainingMinutes * 65).toLocaleString('en-IN')} consultation credit
              </p>
            </div>

            <button
              onClick={onOpenRecharge}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-semibold text-xs active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-md shadow-[#dfb76c]/20 cursor-pointer"
            >
              <span>+ Add Recharge Pack</span>
            </button>
          </div>

          {/* Consultation Transaction History */}
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-xs text-[#dfb76c] uppercase tracking-wider">
              Recent Consultations
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#121524] border border-[#23293f] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#fcedc5] block">Acharya Rajiv Shastri</span>
                  <span className="text-[10px] text-[#8e8779]">Today · Career Consultation</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-mono font-medium block">-3 mins</span>
                  <span className="text-[10px] text-emerald-400">Completed</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121524] border border-[#23293f] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#fcedc5] block">Sanctum Pack Recharge</span>
                  <span className="text-[10px] text-[#8e8779]">Yesterday · UPI (GPay)</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-mono font-medium block">+15 mins</span>
                  <span className="text-[10px] text-[#8e8779]">₹799</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121524] border border-[#23293f] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#fcedc5] block">Astro Priya Sharma</span>
                  <span className="text-[10px] text-[#8e8779]">18 Sept · Gemstone Prescription</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-mono font-medium block">-7 mins</span>
                  <span className="text-[10px] text-emerald-400">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SUB-PAGE: Settings & Appearance (Section 19)
  // =========================================================================
  if (subPage === 'settings') {
    return (
      <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
        <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubPage('main')}
              className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:bg-[#181b28] cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#dfb76c]" />
            </button>
            <h2 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Sanctum Settings
            </h2>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 space-y-4 scrollbar-none">
          {/* Appearance Section */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
              Appearance
            </span>
            <div className="p-4 rounded-2xl bg-[#121524] border border-[#23293f] flex items-center justify-between gap-3 shadow-md shadow-black/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#996e28]/30 to-[#dfb76c]/30 border border-[#dfb76c]/30 flex items-center justify-center text-[#dfb76c]">
                  {theme === 'light' ? <Sun className="w-4 h-4 text-[#dfb76c]" /> : <Moon className="w-4 h-4 text-[#dfb76c]" />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-[#fcedc5]">
                    Application Theme
                  </h4>
                  <p className="text-[10.5px] text-[#8e8779]">
                    {theme === 'light' ? 'Warm Ivory daylight theme active' : 'Sacred Midnight celestial theme active'}
                  </p>
                </div>
              </div>

              {/* Segmented Control */}
              <div className="inline-flex p-1 rounded-xl bg-[#0c0d14] border border-[#272d42] shadow-inner shrink-0">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-[#dfb76c] to-[#c49746] text-[#0e1017] shadow-sm shadow-[#dfb76c]/30'
                      : 'text-[#8e8779] hover:text-[#ede8dc]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-[#dfb76c] to-[#c49746] text-[#0e1017] shadow-sm shadow-[#dfb76c]/30'
                      : 'text-[#8e8779] hover:text-[#ede8dc]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
              Preferences
            </span>
            <div className="rounded-2xl bg-[#121524] border border-[#23293f] overflow-hidden divide-y divide-[#1b2034]">
              <div className="p-3.5 flex items-center justify-between text-xs text-[#ede8dc]">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-[#dfb76c]" />
                  <span>Muhurat & Transit Notifications</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs">Enabled</span>
              </div>
              <div className="p-3.5 flex items-center justify-between text-xs text-[#ede8dc]">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#dfb76c]" />
                  <span>Haptic Micro-interactions</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs">Active</span>
              </div>
              <div className="p-3.5 flex items-center justify-between text-xs text-[#ede8dc]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Kundli Zero-Knowledge Encryption</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs">AES-256</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN PROFILE SCREEN (Sections 13, 14, 15, 16, 17, 18)
  // =========================================================================
  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
      {/* 1. Header (Section 13) */}
      <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToChats}
            className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:bg-[#181b28] cursor-pointer transition-colors"
            title="Back to Chats"
          >
            <ArrowLeft className="w-5 h-5 text-[#dfb76c]" />
          </button>
          <div>
            <h2 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Profile & Account
            </h2>
            <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
              Kismatio Vedic Sanctuary
            </p>
          </div>
        </div>

        <button
          onClick={() => setSubPage('settings')}
          className="p-2 rounded-xl bg-[#141724] border border-[#2a2e45] text-[#cdc7ba] hover:text-[#dfb76c] hover:border-[#dfb76c]/30 active:scale-95 transition-all cursor-pointer"
          title="Account Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </header>

      {/* Main Scrollable Profile Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 space-y-4 scrollbar-none">
        {/* ================================================================= */}
        {/* 2. PROFILE HERO & AVATAR (Section 14)                             */}
        {/* ================================================================= */}
        <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#151829]/95 via-[#111322]/90 to-[#0c0d16] border border-[#dfb76c]/20 shadow-xl shadow-black/40 text-center flex flex-col items-center group">
          {/* Subtle celestial radial glow */}
          <div className="absolute top-2 w-32 h-32 rounded-full bg-radial from-[#dfb76c]/20 via-[#a855f7]/10 to-transparent blur-xl pointer-events-none" />

          {/* Avatar with radiant ring */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-1 shadow-lg shadow-[#dfb76c]/20 relative mb-2">
            <div className="w-full h-full rounded-full bg-[#121524] flex items-center justify-center font-display text-2xl font-bold text-[#dfb76c]">
              {kundli.name ? kundli.name.charAt(0) : 'D'}
            </div>
            <span
              className="absolute bottom-0 right-0 p-1 rounded-full bg-[#dfb76c] text-[#0e1017] border-2 border-[#121524] shadow-sm"
              title="Verified Vedic Seeker"
            >
              <Sparkles className="w-3 h-3 fill-current" />
            </span>
          </div>

          {/* User details */}
          <h3 className="font-display font-bold text-base sm:text-lg text-[#fcedc5]">
            {kundli.name}
          </h3>
          <p className="text-xs text-[#8e8779] font-mono">
            @devanand_sharma · {kundli.placeOfBirth}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d2e] border border-[#dfb76c]/30 text-[#dfb76c] text-[10.5px] mt-2 font-medium">
            <span>✦ {kundli.lagna} Lagna</span>
            <span>·</span>
            <span>{kundli.moonSign} Moon</span>
          </div>

          <button
            onClick={() => setSubPage('personal_info')}
            className="mt-3 px-4 py-1.5 rounded-xl bg-[#1a1f33] hover:bg-[#252c48] border border-[#dfb76c]/25 text-[#dfb76c] font-semibold text-xs active:scale-95 transition-all cursor-pointer"
          >
            ✎ Edit Birth Details
          </button>
        </div>

        {/* ================================================================= */}
        {/* 3. MINUTES / WALLET CARD (Section 16)                             */}
        {/* ================================================================= */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171b30] to-[#121424] border border-[#dfb76c]/30 shadow-lg shadow-black/30 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#dfb76c] uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>✦ Chat Balance</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-2xl text-[#fcedc5]">
                {remainingMinutes}
              </span>
              <span className="text-xs text-[#8e8779]">minutes available</span>
            </div>
            <p className="text-[10px] text-[#9a9385]">
              Seamless Vedic consultations on demand
            </p>
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              onClick={onOpenRecharge}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-semibold text-xs active:scale-95 transition-all shadow-md shadow-[#dfb76c]/20 cursor-pointer"
            >
              + Recharge
            </button>
            <button
              onClick={() => setSubPage('wallet')}
              className="text-[10px] text-[#dfb76c] hover:underline text-center cursor-pointer"
            >
              View statement
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. ACTIVE ORDER TEASER (Section 17)                               */}
        {/* ================================================================= */}
        {currentOrder && (
          <div
            onClick={() => setSubPage('orders')}
            className="p-3.5 rounded-2xl bg-[#131626]/90 border border-[#dfb76c]/25 hover:border-[#dfb76c]/40 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center justify-between text-[10px] text-[#8e8779] mb-1">
              <span className="font-mono text-[#dfb76c] uppercase">
                Active Consecration Order
              </span>
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Pooja in Progress</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs sm:text-[13px] text-[#fcedc5]">
                  {currentOrder.gemstone.name}
                </h4>
                <p className="text-[11px] text-[#8e8779]">
                  Muhurat: {currentOrder.muhuratDate} ({currentOrder.muhuratTime})
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#dfb76c] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* APPEARANCE SECTION & COMPACT SEGMENTED CONTROL (Section 1)        */}
        {/* ================================================================= */}
        <div className="space-y-1.5">
          <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
            Appearance
          </span>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121524] border border-[#23293f] flex items-center justify-between gap-3 shadow-md shadow-black/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#996e28]/30 to-[#dfb76c]/30 border border-[#dfb76c]/30 flex items-center justify-center text-[#dfb76c] shrink-0">
                {theme === 'light' ? (
                  <Sun className="w-4 h-4 text-[#dfb76c]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#dfb76c]" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#fcedc5] truncate">
                  Application Theme
                </h4>
                <p className="text-[10.5px] text-[#8e8779] truncate">
                  {theme === 'light' ? 'Warm Ivory daylight theme active' : 'Sacred Midnight celestial theme active'}
                </p>
              </div>
            </div>

            {/* Segmented Control */}
            <div className="inline-flex p-1 rounded-xl bg-[#0c0d14] border border-[#272d42] shadow-inner shrink-0">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-[#dfb76c] to-[#c49746] text-[#0e1017] shadow-sm shadow-[#dfb76c]/30 scale-[1.02]'
                    : 'text-[#8e8779] hover:text-[#ede8dc]'
                }`}
                title="Switch to Warm Celestial Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-[#dfb76c] to-[#c49746] text-[#0e1017] shadow-sm shadow-[#dfb76c]/30 scale-[1.02]'
                    : 'text-[#8e8779] hover:text-[#ede8dc]'
                }`}
                title="Switch to Sacred Midnight Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 5. GROUPED SECTIONS (Section 15 & 18)                             */}
        {/* ================================================================= */}

        {/* Section: Account */}
        <div className="space-y-1">
          <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
            Account & Horoscope
          </span>
          <div className="rounded-2xl bg-[#121524] border border-[#23293f] overflow-hidden divide-y divide-[#1b2034]">
            <button
              onClick={() => setSubPage('personal_info')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#161a2c] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#dfb76c]" />
                <span className="text-xs sm:text-[13px] text-[#ede8dc]">
                  Personal & Birth Information
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e8779]">
                <span>{kundli.placeOfBirth}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfb76c]" />
              </div>
            </button>

            <button
              onClick={() => setSubPage('personal_info')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#161a2c] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#dfb76c]" />
                <span className="text-xs sm:text-[13px] text-[#ede8dc]">
                  Janma Kundli & Navamsha (D9)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e8779]">
                <span>{kundli.lagna}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfb76c]" />
              </div>
            </button>

            <button
              onClick={() => setSubPage('personal_info')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#161a2c] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#dfb76c]" />
                <span className="text-xs sm:text-[13px] text-[#ede8dc]">
                  Languages
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e8779]">
                <span>Hindi, English</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfb76c]" />
              </div>
            </button>
          </div>
        </div>

        {/* Section: Payments & Orders */}
        <div className="space-y-1">
          <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
            Payments & Sanctum Store
          </span>
          <div className="rounded-2xl bg-[#121524] border border-[#23293f] overflow-hidden divide-y divide-[#1b2034]">
            <button
              onClick={() => setSubPage('wallet')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#161a2c] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[#dfb76c]" />
                <span className="text-xs sm:text-[13px] text-[#ede8dc]">
                  Wallet & Recharge Packs
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e8779]">
                <span className="text-[#dfb76c] font-mono">{remainingMinutes} mins</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfb76c]" />
              </div>
            </button>

            <button
              onClick={() => setSubPage('orders')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#161a2c] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#dfb76c]" />
                <span className="text-xs sm:text-[13px] text-[#ede8dc]">
                  Gemstone Orders & Consecration
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e8779]">
                <span>{currentOrder ? '1 In Progress' : '0 Orders'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfb76c]" />
              </div>
            </button>
          </div>
        </div>

        {/* Section: Saved Astrology */}
        <div className="space-y-1">
          <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
            Saved & Shastra Archives
          </span>
          <div className="rounded-2xl bg-[#121524] border border-[#23293f] overflow-hidden divide-y divide-[#1b2034]">
            <button
              onClick={onBackToChats}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#161a2c] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-[#dfb76c]" />
                <span className="text-xs sm:text-[13px] text-[#ede8dc]">
                  Saved Astrologers & Readings
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e8779]">
                <span>2 Saved</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#dfb76c]" />
              </div>
            </button>
          </div>
        </div>

        {/* Section: Settings & Support */}
        <div className="space-y-1">
          <span className="text-[10.5px] font-mono text-[#8e8779] uppercase tracking-wider px-1">
            Privacy & Sanctum Support
          </span>
          <div className="rounded-2xl bg-[#121524] border border-[#23293f] overflow-hidden divide-y divide-[#1b2034]">
            <div className="w-full p-3.5 flex items-center justify-between text-xs sm:text-[13px] text-[#ede8dc]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kundli Privacy & End-to-End Encryption</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Secured</span>
            </div>

            <div className="w-full p-3.5 flex items-center justify-between text-xs sm:text-[13px] text-[#ede8dc]">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#dfb76c]" />
                <span>24/7 Sanctum Concierge & Help</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8e8779]" />
            </div>

            <div className="w-full p-3.5 flex items-center justify-between text-xs sm:text-[13px] text-red-400 hover:bg-[#20151a] cursor-pointer">
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Log Out</span>
              </div>
              <span className="text-[10px] text-[#8e8779]">v2.6.4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
