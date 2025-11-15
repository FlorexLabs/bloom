<template>
  <div>
    <!-- Toast Notifications -->
    <transition-group name="toast" tag="div" class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[320px] flex items-start gap-3"
      >
        <div class="flex-shrink-0">
          <svg
            v-if="toast.type === 'success'"
            class="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <svg
            v-if="toast.type === 'error'"
            class="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <svg
            v-if="toast.type === 'info'"
            class="w-5 h-5 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ toast.message }}</p>
        </div>
        <button
          @click="removeToast(toast.id)"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </transition-group>

    <!-- Sidebar -->
    <transition name="fade">
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-[#00000030] bg-opacity-50 z-30 lg:hidden"
      ></div>
    </transition>

    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        sidebarCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div v-if="!sidebarCollapsed" class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <span class="font-semibold text-lg text-gray-900 dark:text-white">Monitor</span>
          </div>
          <button
            @click="sidebarCollapsed = !sidebarCollapsed"
            class="hidden lg:block p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <a
            v-for="item in navItems"
            :key="item.id"
            @click="
              currentView = item.id
              sidebarOpen = false
            "
            :class="[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors',
              currentView === item.id ?
                'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
            </svg>
            <span v-if="!sidebarCollapsed" class="font-medium">{{ item.label }}</span>
            <span
              v-if="item.badge && !sidebarCollapsed"
              class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
            >
              {{ item.badge }}
            </span>
          </a>
        </nav>

        <!-- Footer -->
        <div class="p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            v-if="!sidebarCollapsed"
            class="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span class="font-medium">Settings</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div :class="['transition-all duration-300', sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64']">
      <!-- Top Navigation -->
      <header class="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div class="h-full px-4 lg:px-6 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ navItems.find((i) => i.id === currentView)?.label || 'Dashboard' }}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <!-- Dark Mode Toggle -->
            <button
              @click="darkMode = !darkMode"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <svg v-if="!darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </button>

            <!-- Notifications -->
            <div class="relative">
              <button
                @click="showNotifications = !showNotifications"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 relative"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
                <span
                  v-if="unreadNotifications > 0"
                  class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                ></span>
              </button>

              <transition name="fade">
                <div
                  v-if="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div class="max-h-96 overflow-y-auto">
                    <div
                      v-for="notif in notifications"
                      :key="notif.id"
                      class="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                    >
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ notif.title }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {{ notif.message }}
                      </p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ notif.time }}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- User Avatar -->
            <div class="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <div
                class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              >
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 lg:p-6">
        <!-- Dashboard View -->
        <div v-if="currentView === 'dashboard'">
          <!-- Summary Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Monitored Services</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">
                    {{ services.length }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="status-dot status-ok"></span>
                    <span class="text-xs text-gray-500 dark:text-gray-400"
                      >{{ services.filter((s) => s.status === 'ok').length }} healthy</span
                    >
                  </div>
                </div>
                <div class="w-12 h-12 bg-teal-100 dark:bg-teal-500/10 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-teal-600 dark:text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Alerts</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ activeAlerts }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Last 24 hours</p>
                </div>
                <div
                  class="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-lg flex items-center justify-center relative"
                >
                  <svg
                    class="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">System Uptime</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">99.8%</p>
                  <p class="text-xs text-green-500 mt-2">↑ 0.2% from last week</p>
                </div>
                <div class="w-12 h-12 bg-green-100 dark:bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Service Cards -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Services</h2>
            <button
              @click="showToast('Feature coming soon!', 'info')"
              class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Service
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
              v-for="service in services"
              :key="service.id"
              @click="
                selectedService = service
                currentView = 'service-detail'
              "
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:border-teal-300 dark:hover:border-teal-600 transition-colors cursor-pointer group"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-2">
                  <span :class="['status-dot', `status-${service.status}`]"></span>
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ service.name }}</h3>
                </div>
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    service.status === 'ok' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                    : service.status === 'warning' ?
                      'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
                  ]"
                >
                  {{ service.status.toUpperCase() }}
                </span>
              </div>

              <div class="space-y-3 mb-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Type</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ service.type }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Response Time</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ service.responseTime }}ms</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Last Check</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ service.lastCheck }}</span>
                </div>
              </div>

              <!-- Sparkline -->
              <div class="h-16 flex items-end gap-1">
                <div
                  v-for="(value, index) in service.sparkline"
                  :key="index"
                  :style="{height: value + '%'}"
                  class="flex-1 bg-teal-200 dark:bg-teal-500/30 rounded-t group-hover:bg-teal-400 dark:group-hover:bg-teal-500 transition-colors"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Services List View -->
        <div v-if="currentView === 'services'">
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">All Services</h2>
              <button
                @click="showToast('Feature coming soon!', 'info')"
                class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Add Service
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Response Time
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Last Check
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr
                    v-for="service in services"
                    :key="service.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                    @click="
                      selectedService = service
                      currentView = 'service-detail'
                    "
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span :class="['status-dot', `status-${service.status}`]"></span>
                        <span class="font-medium text-gray-900 dark:text-white">{{ service.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ service.type }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 py-1 rounded text-xs font-medium',
                          service.status === 'ok' ?
                            'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                          : service.status === 'warning' ?
                            'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
                        ]"
                      >
                        {{ service.status.toUpperCase() }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {{ service.responseTime }}ms
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ service.lastCheck }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        @click.stop="showToast('Feature coming soon!', 'info')"
                        class="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Service Detail View -->
        <div v-if="currentView === 'service-detail' && selectedService">
          <div class="mb-4">
            <button
              @click="currentView = 'dashboard'"
              class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Dashboard
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
              <!-- Service Header -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-start justify-between mb-6">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <span :class="['status-dot', `status-${selectedService.status}`]"></span>
                      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {{ selectedService.name }}
                      </h1>
                    </div>
                    <p class="text-gray-500 dark:text-gray-400">{{ selectedService.type }} Service</p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      @click="showToast('Service paused', 'info')"
                      class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
                    >
                      Pause Checks
                    </button>
                    <button
                      @click="
                        showToast('Service deleted', 'success')
                        currentView = 'dashboard'
                      "
                      class="px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Status</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                      {{ selectedService.status }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Response</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ selectedService.responseTime }}ms
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Uptime (30d)</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">99.5%</p>
                  </div>
                </div>
              </div>

              <!-- Status Timeline Chart -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response Time (Last 24h)</h3>
                <div class="h-64 flex items-end gap-2">
                  <div
                    v-for="(value, index) in Array.from({length: 24}, () => Math.random() * 100)"
                    :key="index"
                    :style="{height: value + '%'}"
                    class="flex-1 bg-gradient-to-t from-teal-500 to-teal-300 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                  ></div>
                </div>
                <div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>24h ago</span>
                  <span>Now</span>
                </div>
              </div>

              <!-- Alert History -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h3>
                <div class="space-y-3">
                  <div
                    v-for="alert in alertHistory.filter((a) => a.service === selectedService.name).slice(0, 5)"
                    :key="alert.id"
                    class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div
                      :class="[
                        'w-2 h-2 rounded-full mt-2',
                        alert.severity === 'critical' ? 'bg-red-500'
                        : alert.severity === 'warning' ? 'bg-yellow-500'
                        : 'bg-blue-500',
                      ]"
                    ></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ alert.message }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {{ alert.timestamp }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Environment Details -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environment</h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">URL</p>
                    <p class="text-sm font-mono text-gray-900 dark:text-white break-all">https://api.example.com</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Port</p>
                    <p class="text-sm font-mono text-gray-900 dark:text-white">443</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Check Interval</p>
                    <p class="text-sm font-mono text-gray-900 dark:text-white">60 seconds</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Timeout</p>
                    <p class="text-sm font-mono text-gray-900 dark:text-white">30 seconds</p>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div class="space-y-2">
                  <button
                    @click="showToast('Check triggered', 'success')"
                    class="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Run Check Now
                  </button>
                  <button
                    @click="showToast('Opening editor...', 'info')"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
                  >
                    Edit Configuration
                  </button>
                  <button
                    @click="showToast('Logs exported', 'success')"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
                  >
                    Export Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Alerts Settings View -->
        <div v-if="currentView === 'alerts'">
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <!-- Tabs -->
            <div class="border-b border-gray-200 dark:border-gray-700">
              <nav class="flex -mb-px">
                <button
                  v-for="channel in alertChannels"
                  :key="channel.id"
                  @click="activeAlertTab = channel.id"
                  :class="[
                    'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                    activeAlertTab === channel.id ?
                      'border-teal-500 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300',
                  ]"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="channel.icon"></path>
                    </svg>
                    {{ channel.name }}
                  </div>
                </button>
              </nav>
            </div>

            <!-- Tab Content -->
            <div class="p-6">
              <div v-for="channel in alertChannels" :key="channel.id" v-show="activeAlertTab === channel.id">
                <div class="max-w-2xl">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ channel.name }} Configuration
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Configure {{ channel.name }} alerts for your services
                      </p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" :checked="channel.enabled" class="sr-only peer" />
                      <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"
                      ></div>
                      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enabled</span>
                    </label>
                  </div>

                  <div class="space-y-4">
                    <div v-if="channel.id === 'email'">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >Email Recipients</label
                      >
                      <input
                        type="text"
                        placeholder="admin@example.com, ops@example.com"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple emails with commas</p>
                    </div>

                    <div v-if="channel.id === 'slack'">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Webhook URL</label>
                      <input
                        type="text"
                        placeholder="https://hooks.slack.com/services/..."
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div v-if="channel.id === 'telegram'">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bot Token</label>
                      <input
                        type="text"
                        placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
                      />
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chat ID</label>
                      <input
                        type="text"
                        placeholder="-1001234567890"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div v-if="channel.id === 'mattermost'">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Webhook URL</label>
                      <input
                        type="text"
                        placeholder="https://mattermost.example.com/hooks/..."
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div class="flex gap-3 pt-4">
                      <button
                        @click="showToast('Test notification sent!', 'success')"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors"
                      >
                        Send Test
                      </button>
                      <button
                        @click="showToast('Settings saved!', 'success')"
                        class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Save Configuration
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Logs View -->
        <div v-if="currentView === 'logs'">
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <input
                    v-model="logSearch"
                    type="text"
                    placeholder="Search logs..."
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <select
                  v-model="logSeverityFilter"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Timestamp
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Message
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                      {{ log.timestamp }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {{ log.service }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {{ log.message }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 py-1 rounded text-xs font-medium',
                          log.severity === 'critical' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                          : log.severity === 'error' ?
                            'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400'
                          : log.severity === 'warning' ?
                            'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                          : 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
                        ]"
                      >
                        {{ log.severity.toUpperCase() }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
      sidebarOpen: false,
      sidebarCollapsed: false,
      currentView: 'dashboard',
      selectedService: null,
      showNotifications: false,
      activeAlertTab: 'email',
      logSearch: '',
      logSeverityFilter: 'all',
      toasts: [],
      toastId: 0,
      navItems: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        },
        {
          id: 'services',
          label: 'Services',
          icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
        },
        {
          id: 'alerts',
          label: 'Alerts',
          icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
          badge: 3,
        },
        {
          id: 'logs',
          label: 'Logs',
          icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        },
      ],
      services: [
        {
          id: 1,
          name: 'rails-api',
          type: 'Rails',
          status: 'ok',
          responseTime: 145,
          lastCheck: '2 min ago',
          sparkline: [40, 45, 42, 48, 55, 52, 58, 62, 60, 65, 68, 70],
        },
        {
          id: 2,
          name: 'node-worker',
          type: 'Node.js',
          status: 'ok',
          responseTime: 89,
          lastCheck: '1 min ago',
          sparkline: [30, 35, 32, 38, 45, 42, 48, 52, 50, 55, 58, 60],
        },
        {
          id: 3,
          name: 'auth-service',
          type: 'Rails',
          status: 'warning',
          responseTime: 312,
          lastCheck: '3 min ago',
          sparkline: [50, 55, 62, 68, 75, 72, 78, 82, 80, 85, 88, 70],
        },
        {
          id: 4,
          name: 'websocket-server',
          type: 'Node.js',
          status: 'ok',
          responseTime: 52,
          lastCheck: '1 min ago',
          sparkline: [20, 25, 22, 28, 35, 32, 38, 42, 40, 45, 48, 50],
        },
        {
          id: 5,
          name: 'payment-gateway',
          type: 'Rails',
          status: 'ok',
          responseTime: 198,
          lastCheck: '2 min ago',
          sparkline: [45, 50, 47, 53, 60, 57, 63, 67, 65, 70, 73, 65],
        },
        {
          id: 6,
          name: 'email-processor',
          type: 'Node.js',
          status: 'error',
          responseTime: 0,
          lastCheck: '5 min ago',
          sparkline: [35, 40, 37, 43, 50, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      alertChannels: [
        {
          id: 'email',
          name: 'Email',
          icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
          enabled: true,
        },
        {
          id: 'slack',
          name: 'Slack',
          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
          enabled: true,
        },
        {
          id: 'telegram',
          name: 'Telegram',
          icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
          enabled: false,
        },
        {
          id: 'mattermost',
          name: 'Mattermost',
          icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
          enabled: false,
        },
      ],
      alertHistory: [
        {
          id: 1,
          service: 'email-processor',
          message: 'Service is down - Connection timeout',
          severity: 'critical',
          timestamp: '2024-01-15 14:23:15',
        },
        {
          id: 2,
          service: 'auth-service',
          message: 'High response time detected (>300ms)',
          severity: 'warning',
          timestamp: '2024-01-15 14:18:42',
        },
        {
          id: 3,
          service: 'rails-api',
          message: 'Service recovered',
          severity: 'info',
          timestamp: '2024-01-15 13:45:11',
        },
        {
          id: 4,
          service: 'websocket-server',
          message: 'Memory usage above 80%',
          severity: 'warning',
          timestamp: '2024-01-15 13:12:33',
        },
        {
          id: 5,
          service: 'payment-gateway',
          message: 'SSL certificate expires in 7 days',
          severity: 'warning',
          timestamp: '2024-01-15 12:00:00',
        },
      ],
      systemLogs: [
        {
          id: 1,
          timestamp: '2024-01-15 14:23:15',
          service: 'email-processor',
          message: 'Connection timeout after 30 seconds',
          severity: 'critical',
        },
        {
          id: 2,
          timestamp: '2024-01-15 14:22:45',
          service: 'email-processor',
          message: 'Retry attempt 3/3 failed',
          severity: 'error',
        },
        {
          id: 3,
          timestamp: '2024-01-15 14:21:15',
          service: 'email-processor',
          message: 'Retry attempt 2/3 failed',
          severity: 'error',
        },
        {
          id: 4,
          timestamp: '2024-01-15 14:18:42',
          service: 'auth-service',
          message: 'Response time 312ms exceeds threshold',
          severity: 'warning',
        },
        {
          id: 5,
          timestamp: '2024-01-15 14:15:30',
          service: 'rails-api',
          message: 'Health check passed',
          severity: 'info',
        },
        {
          id: 6,
          timestamp: '2024-01-15 14:14:30',
          service: 'node-worker',
          message: 'Health check passed',
          severity: 'info',
        },
        {
          id: 7,
          timestamp: '2024-01-15 14:13:45',
          service: 'websocket-server',
          message: 'Health check passed',
          severity: 'info',
        },
        {
          id: 8,
          timestamp: '2024-01-15 14:12:33',
          service: 'websocket-server',
          message: 'Memory usage: 82%',
          severity: 'warning',
        },
        {
          id: 9,
          timestamp: '2024-01-15 14:10:21',
          service: 'payment-gateway',
          message: 'Transaction processed successfully',
          severity: 'info',
        },
        {
          id: 10,
          timestamp: '2024-01-15 14:08:15',
          service: 'auth-service',
          message: 'User authentication successful',
          severity: 'info',
        },
      ],
      notifications: [
        {
          id: 1,
          title: 'Service Down',
          message: 'email-processor is not responding',
          time: '5 min ago',
        },
        {
          id: 2,
          title: 'High Response Time',
          message: 'auth-service response time above threshold',
          time: '10 min ago',
        },
        {
          id: 3,
          title: 'Service Recovered',
          message: 'rails-api is back online',
          time: '1 hour ago',
        },
      ],
    }
  },
  computed: {
    activeAlerts() {
      return this.alertHistory.filter((a) => a.severity === 'critical' || a.severity === 'error').length
    },
    unreadNotifications() {
      return this.notifications.length
    },
    filteredLogs() {
      return this.systemLogs.filter((log) => {
        const matchesSearch =
          log.message.toLowerCase().includes(this.logSearch.toLowerCase()) ||
          log.service.toLowerCase().includes(this.logSearch.toLowerCase())
        const matchesSeverity = this.logSeverityFilter === 'all' || log.severity === this.logSeverityFilter
        return matchesSearch && matchesSeverity
      })
    },
  },
  methods: {
    showToast(message, type = 'info') {
      const id = this.toastId++
      this.toasts.push({id, message, type})
      setTimeout(() => this.removeToast(id), 3000)
    },
    removeToast(id) {
      const index = this.toasts.findIndex((t) => t.id === id)
      if (index > -1) this.toasts.splice(index, 1)
    },
  },
  watch: {
    darkMode(value) {
      document.documentElement.classList.toggle('dark', value)
    },
  },
  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true
    }
    setInterval(() => {
      this.services.forEach((service) => {
        const randomMinutes = Math.floor(Math.random() * 5) + 1
        service.lastCheck = `${randomMinutes} min ago`
      })
    }, 60000)
  },
}
</script>

<style scoped>
/* keep this empty or put small component overrides */
</style>
