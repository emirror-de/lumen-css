(function (global, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        global.LumenTabs = factory();
    }
})(globalThis, function () {
    "use strict";

    const HOST_SELECTOR = '[data-ui="tabs"]';

    function getHosts(root) {
        const hosts = [];
        if (root.matches && root.matches(HOST_SELECTOR)) hosts.push(root);
        if (root.querySelectorAll) hosts.push(...root.querySelectorAll(HOST_SELECTOR));
        return hosts;
    }

    function createController(host) {
        const tablists = Array.from(host.children).filter((child) => child.getAttribute("role") === "tablist");
        if (tablists.length !== 1) return null;

        const tablist = tablists[0];
        const tabs = Array.from(tablist.children).filter((child) =>
            child.matches('button[role="tab"][aria-controls]')
        );
        const panels = tabs.map((tab) => {
            const panelId = tab.getAttribute("aria-controls");
            return Array.from(host.children).find((child) => child.id === panelId);
        });
        if (
            tabs.length === 0 ||
            panels.some((panel) => !panel || panel.getAttribute("role") !== "tabpanel") ||
            new Set(panels).size !== panels.length
        ) {
            return null;
        }

        let activeIndex = Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"));

        function activate(index, moveFocus) {
            activeIndex = index;
            tabs.forEach((tab, tabIndex) => {
                const selected = tabIndex === activeIndex;
                tab.setAttribute("aria-selected", String(selected));
                tab.tabIndex = selected ? 0 : -1;
                panels[tabIndex].hidden = !selected;
            });
            if (moveFocus) tabs[activeIndex].focus();
        }

        function onClick(event) {
            const index = tabs.indexOf(event.target.closest('button[role="tab"]'));
            if (index !== -1) activate(index, false);
        }

        function onKeydown(event) {
            const currentIndex = tabs.indexOf(event.target);
            if (currentIndex === -1) return;

            const vertical = tablist.getAttribute("aria-orientation") === "vertical";
            let nextIndex;
            if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) {
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            activate(nextIndex, true);
        }

        activate(activeIndex, false);
        host.addEventListener("click", onClick);
        tablist.addEventListener("keydown", onKeydown);

        return {
            destroy() {
                host.removeEventListener("click", onClick);
                tablist.removeEventListener("keydown", onKeydown);
            },
        };
    }

    function initTabs(root) {
        const scope = root || (typeof document !== "undefined" ? document : null);
        if (!scope) throw new Error("initTabs requires a Document or Element root");

        const controllers = getHosts(scope).map(createController).filter(Boolean);
        let destroyed = false;
        return {
            destroy() {
                if (destroyed) return;
                destroyed = true;
                controllers.forEach((controller) => controller.destroy());
            },
        };
    }

    return { initTabs };
});
